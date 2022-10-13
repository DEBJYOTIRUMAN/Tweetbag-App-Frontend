import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileContent from "../../components/profile/ProfileContent";
import Sidebar from "../../components/home/Sidebar";
import Widgets from "../../components/home/Widgets";
import { TweetbagContext } from "../../context/TweetbagContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
  mainContent: `border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem]`,
};

const profile = () => {
  const {
    currentUser,
    setCurrentUser,
    currentAccount,
    posts,
    setPosts,
    allUsers,
    setAllUsers,
    news,
    setAppStatus,
    fetchAllUsers,
  } = useContext(TweetbagContext);
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("Posts");
  const [renderPosts, setRenderPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (activeTab === "Posts") {
      setRenderPosts(posts.filter((item) => item.walletAddress === id));
    } else if (activeTab === "Reposts") {
      setRenderPosts(posts.filter((item) => item.reposts.includes(id)));
    } else if (activeTab === "Media") {
      setRenderPosts(
        posts.filter((item) => item.walletAddress === id && item.imageUrl)
      );
    } else if (activeTab === "Likes") {
      setRenderPosts(posts.filter((item) => item.likes.includes(id)));
    } else return;
  }, [activeTab, posts, id]);

  useEffect(() => {
    setUser(allUsers.find((item) => item.walletAddress === id));
  }, [allUsers, id]);

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar
          initialSelectedIcon={"Profile"}
          currentAccount={currentAccount}
          currentUser={currentUser}
          posts={posts}
          setPosts={setPosts}
        />
        <div className={style.mainContent}>
          <ProfileHeader
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            currentAccount={currentAccount}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            renderPosts={renderPosts}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
            id={id}
            setAppStatus={setAppStatus}
            user={user}
          />
          <ProfileContent
            currentAccount={currentAccount}
            currentUser={currentUser}
            posts={posts}
            setPosts={setPosts}
            renderPosts={renderPosts}
            activeTab={activeTab}
          />
        </div>
        <Widgets
          currentUser={currentUser}
          currentAccount={currentAccount}
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          setCurrentUser={setCurrentUser}
          news={news}
        />
      </div>
    </div>
  );
};

export default profile;
