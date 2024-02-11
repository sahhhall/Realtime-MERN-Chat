import formatedDate from "../utils/formatDate";

export const getChatEnderName = (loggedUser, users) => {
    console.log("loggedUser:", loggedUser);
    console.log("users:", users);
    const chatEnder = users ?. find(user => user ?. _id !== loggedUser._id);
    return chatEnder ? chatEnder.name : null;
};

/**
 * Retrieves the profile picture of the sender in a chat based on the logged-in user and other users.
 * @param {object} loggedUser - The details of the logged-in user.
 * @param {object[]} users - An array of user objects.
 * @returns {string} The profile picture of the sender in the chat, or an empty string if not found.
 */

export const getProfileSender = (loggedUser, users) => {
    const chatEnder = users ?. find(user => user ?. _id !== loggedUser._id);
    return chatEnder ? chatEnder.picture : '';
}

/**
 * Retrieves the full details of a user from an array of users,by selectedChat.
 * @param {object} loggedUser - The logged-in user object.
 * @param {Array<object>} users - An array containing user objects (loggeduser and opposite).
 * @returns {object|undefined} - The full details of a user from the array, excluding the logged-in user. Returns undefined if no user is found.
 */
export const getUserFullDetails = (loggedUser, users) => {
    return users ?. find(user => user ?. _id !== loggedUser._id);
}


/**
 * Calculates the number of common group chats between the logged user and another user.
 * @param {object} loggedUser - The details of the logged-in user.
 * @param {object[]} users - An array of user objects.
 * @param {object[]} fullChats - An array of chat objects.
 * @returns {number} The number of common group chats.
 */
export const getCommonGroupCount = (loggedUser, users, fullChats) => {
    const oppositeUserDetails = users ?. find(user => user ?. _id !== loggedUser._id);
    const senderId = oppositeUserDetails._id;
    const userId = loggedUser._id;
    if (! oppositeUserDetails) {
        return 0;
    }
    const totalGroups = fullChats.filter(chat => chat.isGroupChat)
    const commoo = totalGroups.filter(group => group.users.includes(senderId) && group.users.includes(userId));
    return commoo.length;
};




/**
 * Get the creation date of a user.
 * @param {object} loggedUser - The logged-in user object.
 * @param {Array<object>} users - An array of user objects.
 * @returns {object} - The formatted creation date of the user.
 */

export const getCreatedAt = (loggedUser, users) => {

    const getDateJoined = users ?. find(user => user ?. _id !== loggedUser._id);
    const date = new Date(getDateJoined.createdAt)
    return formatedDate(date)
  
}


export const isNotLoggedUser = ( message, i, userId) => {
    return (
        message.sender._id !== userId
    )

  };
  

  

//   export const isLastMessage = (messages, i, userId) => {
//     return (
//       i === messages.length - 1 &&
//       messages[messages.length - 1].sender._id !== userId &&
//       messages[messages.length - 1].sender._id
//     );
//   };