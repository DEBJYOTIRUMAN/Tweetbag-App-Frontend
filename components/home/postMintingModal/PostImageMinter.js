import { useState, useContext } from "react";
import { TweetbagContext } from "../../../context/TweetbagContext";
import { contractABI, contractAddress } from "../../../lib/constants";
import { ethers } from "ethers";
import InitialState from "./InitialState";
import LoadingState from "../../profile/mintingModal/LoadingState";
import FinishedState from "../../profile/mintingModal/FinishedState";
import { pinJSONToIPFS, pinFileToIPFS } from "../../../lib/pinata";
import axios from "axios";

const getEthereumContract = () => {
  let metamask = window.ethereum;
  if(!metamask) return;
  const provider = new ethers.providers.Web3Provider(metamask);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};


const PostImageMinter = ({ posts, setPosts, setMintModalVisible }) => {
  const { currentAccount, setAppStatus } = useContext(TweetbagContext);

  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("initial");
  const [postImage, setPostImage] = useState();

  const mint = async () => {
    if (!caption || !postImage) return;
    setStatus("loading");

    const pinataMetaData = {
      name: caption,
    };

    const ipfsImageHash = await pinFileToIPFS(postImage, pinataMetaData);
    const imageMetaData = {
      name: caption,
      image: `ipfs://${ipfsImageHash}`,
    };

    const ipfsJsonHash = await pinJSONToIPFS(imageMetaData);

    const contract = await getEthereumContract();

    const transactionParameters = {
      to: contractAddress,
      from: currentAccount,
      data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
    };

    try {
      await metamask.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setStatus("finished");
    } catch (error) {
      console.log(error);
      setStatus("finished");
    }
    // Backend
    let formData = new FormData();
    formData.append("caption", caption);
    formData.append("isPostImageNft", true);
    formData.append("image", postImage);
    try {
      const newPost = await axios.post(
        `https://tweetbag.onrender.com/api/post/${currentAccount}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPosts([newPost.data, ...posts]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderLogic = (modalStatus = status) => {
    switch (modalStatus) {
      case "initial":
        return (
          <InitialState
            postImage={postImage}
            setPostImage={setPostImage}
            caption={caption}
            setCaption={setCaption}
            mint={mint}
            setMintModalVisible={setMintModalVisible}
          />
        );

      case "loading":
        return <LoadingState />;

      case "finished":
        return <FinishedState setMintModalVisible={setMintModalVisible}/>;

      default:
        setMintModalVisible(false);
        setStatus("initial");
        setAppStatus("error");
        break;
    }
  };

  return <>{renderLogic()}</>;
};

export default PostImageMinter;
