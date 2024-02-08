export const getChatEnderName = (loggedUser, users) => {
    console.log("loggedUser:", loggedUser);
    console.log("users:", users);
    const chatEnder = users.find(user => user._id !== loggedUser._id);
    return chatEnder ? chatEnder.name : null;
  };