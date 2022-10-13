import { useRouter } from "next/router";
import { useContext } from "react";
import Sidebar from "../components/home/Sidebar";
import Widgets from "../components/home/Widgets";
import ComingSoonFeed from "../components/upcoming/ComingSoonFeed";
import { TweetbagContext } from "../context/TweetbagContext";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
};

const messages = () => {
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
  const initialSelectedScreen = "Messages";
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar
          initialSelectedIcon={initialSelectedScreen}
          currentAccount={currentAccount}
          currentUser={currentUser}
          posts={posts}
          setPosts={setPosts}
        />
        <ComingSoonFeed
          router={router}
          initialSelectedScreen={initialSelectedScreen}
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

export default messages;
