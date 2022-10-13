import { useContext } from "react";
import { TweetbagContext } from "../context/TweetbagContext";
import Sidebar from "../components/home/Sidebar";
import Widgets from "../components/home/Widgets";
import NewsFeed from "../components/explore/NewsFeed";
import { useRouter } from "next/router";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
};
const explore = () => {
  const {
    currentUser,
    setCurrentUser,
    currentAccount,
    posts,
    setPosts,
    allUsers,
    setAllUsers,
    news,
    setNews,
  } = useContext(TweetbagContext);
    const router = useRouter();
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar
          initialSelectedIcon={"Explore"}
          currentAccount={currentAccount}
          currentUser={currentUser}
          posts={posts}
          setPosts={setPosts}
        />
        <NewsFeed
          router={router}
          currentUser={currentUser}
          currentAccount={currentAccount}
          news={news}
          setNews={setNews}
        />
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

export default explore;
