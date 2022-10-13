import Sidebar from "../../components/home/Sidebar";
import Widgets from "../../components/home/Widgets";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { TweetbagContext } from "../../context/TweetbagContext";
import PostFeed from "../../components/postpage/PostFeed";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
};

const PostPage = () => {
  const { currentUser, setCurrentUser, currentAccount, posts, setPosts, allUsers, setAllUsers, news } = useContext(TweetbagContext);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  useEffect(() => {
    setPost(posts.find((item) => item._id === id));
  }, [posts]);
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.content}>
          <Sidebar
            currentAccount={currentAccount}
            currentUser={currentUser}
            posts={posts}
            setPosts={setPosts}
          />
          <PostFeed post={post} router={router} currentAccount={currentAccount} currentUser={currentUser} posts={posts} setPosts={setPosts} />
          <Widgets currentUser={currentUser} currentAccount={currentAccount} allUsers={allUsers} setAllUsers={setAllUsers} setCurrentUser={setCurrentUser} news={news} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
