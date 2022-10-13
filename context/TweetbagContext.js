import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const TweetbagContext = createContext();

export const TweetbagProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [news, setNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        setAppStatus("connected");
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
        fetchPosts();
        fetchAllUsers();
        fetchNews();
      } else {
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (error) {
      setAppStatus("error");
    }
  };

  const connectToWallet = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      setAppStatus("loading");

      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setAppStatus("connected");
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
        fetchPosts();
        fetchAllUsers();
        fetchNews();
      } else {
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (error) {
      setAppStatus("error");
    }
  };

  const createUserAccount = async (userAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const userDoc = {
        name: "Random User",
        walletAddress: userAddress,
      };

      fetch("https://tweetbag.onrender.com/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDoc),
      })
        .then((res) => res.json())
        .then((userDoc) => {
          setCurrentUser(userDoc);
          setAppStatus("connected");
        });
    } catch (error) {
      router.push("/");
      setAppStatus("error");
    }
  };

  const fetchPosts = async () => {
    try {
      await fetch("https://tweetbag.onrender.com/api/post", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((allPosts) => {
          setPosts(allPosts);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      await fetch("https://tweetbag.onrender.com/api/user", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((documents) => {
          const sortedProfile = documents.sort((a, b) => {
            return b.followers.length - a.followers.length;
          });
          setAllUsers(sortedProfile);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNews = async () => {
    try {
      await fetch("https://tweetbag.onrender.com/api/news", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((allNews) => {
          setNews(allNews);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TweetbagContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectToWallet,
        setAppStatus,
        currentUser,
        setCurrentUser,
        posts,
        setPosts,
        allUsers,
        setAllUsers,
        news,
        setNews,
        fetchAllUsers
      }}
    >
      {children}
    </TweetbagContext.Provider>
  );
};
