const handleFollow = (user, currentUser, currentAccount, allUsers, setAllUsers, setCurrentUser) => {
  let updateFollowers = user.followers;
  let updateFollowing = currentUser.following;
  if (!updateFollowers.includes(currentAccount)) {
    updateFollowers.push(currentAccount);
    updateFollowing.push(user.walletAddress);
  } else {
    updateFollowers = updateFollowers.filter((item) => item !== currentAccount);
    updateFollowing = updateFollowing.filter(
      (item) => item !== user.walletAddress
    );
  }
  fetch(`https://tweetbag.onrender.com/api/user/follow/${user.walletAddress}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walletAddress: currentAccount,
      followers: updateFollowers,
      following: updateFollowing,
    }),
  })
    .then((res) => res.json())
    .then((documents) => {
      setAllUsers(
        allUsers.map((user) =>
          user.walletAddress === documents[0].walletAddress
            ? documents[0]
            : user && user.walletAddress === documents[1].walletAddress
            ? documents[1]
            : user
        )
      );
      setCurrentUser(documents[1]);
    });
};
export default handleFollow;
