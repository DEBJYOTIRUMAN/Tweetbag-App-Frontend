import { useContext } from "react";
import ConnectFeed from "../components/connect/ConnectFeed";
import Sidebar from "../components/home/Sidebar";
import Widgets from "../components/home/Widgets";
import { TweetbagContext } from "../context/TweetbagContext";
import { useRouter } from "next/router";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
};

const connect = () => {
  const {
    currentUser,
    setCurrentUser,
    currentAccount,
    posts,
    setPosts,
    allUsers,
    setAllUsers,
    news,
  } = useContext(TweetbagContext);
  const router = useRouter();
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar
          initialSelectedIcon={"Connect"}
          currentAccount={currentAccount}
          currentUser={currentUser}
          posts={posts}
          setPosts={setPosts}
        />
        <ConnectFeed
          router={router}
          currentUser={currentUser}
          currentAccount={currentAccount}
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          setCurrentUser={setCurrentUser}
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

export default connect;
