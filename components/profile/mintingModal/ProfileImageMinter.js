import { useState, useContext } from "react";
import { TweetbagContext } from "../../../context/TweetbagContext";
import { contractABI, contractAddress } from "../../../lib/constants";
import { ethers } from "ethers";
import InitialState from "./InitialState";
import LoadingState from "./LoadingState";
import FinishedState from "./FinishedState";
import { pinJSONToIPFS, pinFileToIPFS } from "../../../lib/pinata";
import axios from "axios";

const getEthereumContract = () => {
  let metamask = window.ethereum;
  if (!metamask) return;
  const provider = new ethers.providers.Web3Provider(metamask);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

const ProfileImageMinter = ({ setCurrentUser, setMintModalVisible, allUsers, setAllUsers }) => {
  const { currentAccount, setAppStatus } = useContext(TweetbagContext);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("initial");
  const [profileImage, setProfileImage] = useState();

  const mint = async () => {
    if (!name || !profileImage) return;
    setStatus("loading");

    const pinataMetaData = {
      name: name,
    };

    const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData);
    const imageMetaData = {
      name: name,
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
    formData.append("profileImage", profileImage);
    formData.append("isProfileImageNft", true);
    try {
      const userDoc = await axios.put(
        `https://tweetbag.onrender.com/api/user/image/${currentAccount}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCurrentUser(userDoc.data);
      setAllUsers(allUsers.map((user) => (user.walletAddress === currentAccount ? userDoc.data : user)));
    } catch (error) {
      console.log(error);
    }
  };

  const renderLogic = (modalStatus = status) => {
    switch (modalStatus) {
      case "initial":
        return (
          <InitialState
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            name={name}
            setName={setName}
            mint={mint}
            setMintModalVisible={setMintModalVisible}
          />
        );

      case "loading":
        return <LoadingState />;

      case "finished":
        return <FinishedState setMintModalVisible={setMintModalVisible} />;

      default:
        setMintModalVisible(false);
        setStatus("initial");
        setAppStatus("error");
        break;
    }
  };

  return <>{renderLogic()}</>;
};

export default ProfileImageMinter;
