import handleFollow from "../../lib/handleFollow";

const style = {
    item: `flex items-center p-5 hover:bg-[#22303c] cursor-pointer sm:p-2`,
    followAvatarContainer: `mr-5 sm:mr-2`,
    followAvatar: `h-[60px] w-[60px] rounded-full object-cover`,
    profileDetails: `flex-1`,
    name: `font-bold xs:text-xs`,
    handle: `text-[#8899a6] xs:text-xs`,
    followButton: `bg-white text-black px-3 py-1 rounded-full text-sm font-bold xs:px-2 xs:text-xs`,
  };
const ConnectUserCard = ({ router, user, currentUser, currentAccount, allUsers, setAllUsers, setCurrentUser }) => {
  return (
    <div className={style.item}>
      <div
        className={style.followAvatarContainer}
        onClick={() => router.push(`/profile/${user.walletAddress}`)}
      >
        <img
          src={user.profileImage}
          alt="Avatar"
          className={user.isProfileImageNft
            ? `${style.followAvatar} smallHex`
            : style.followAvatar}
        />
      </div>
      <div
        className={style.profileDetails}
        onClick={() => router.push(`/profile/${user.walletAddress}`)}
      >
        <div className={style.name}>{user.name}</div>
        <div className={style.handle}>
          @{user.walletAddress.slice(0, 8)}...
          {user.walletAddress.slice(-4)}
        </div>
      </div>
      <div
        className={style.followButton}
        onClick={() =>
          handleFollow(
            user,
            currentUser,
            currentAccount,
            allUsers,
            setAllUsers,
            setCurrentUser
          )
        }
      >
        {user.followers.includes(currentAccount) ? "Following" : "Follow"}
      </div>
    </div>
  );
};

export default ConnectUserCard;
