const socketIO = require("socket.io");

let io;

/**
 * Initializes a Socket.IO server instance.
 * @param {Object} server An HTTP server object created by Express.js.
 */
function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: "*"
        },
        pingTimeout: 600000,
    });

    // Connection event: Triggered when a client connects to the Socket.IO server
    io.on("connection", (socket) => {
        console.log("socket io connection established");

        // Setup event: Triggered when a client sends a setup request
        socket.on("setup", (userData) => {
            socket.join(userData._id);
            console.log(userData._id);
            socket.emit("connected");
        });

        // Join chat event: Triggered when a client requests to join a chat room
        socket.on("join chat", (room) => {
            socket.join(room);
            console.log("User joined room" + room);
        });

        // New message event: Triggered when a client sends a new message
        socket.on("new message", (newMsgRecived) => {
            var chat = newMsgRecived.chat;
            if (!chat.users) return console.log("chat users not defined");
            chat.users.forEach((user) => {
                if (user._id === newMsgRecived.sender._id) return; // Exclude sender from receiving their own message
                else {
                    socket.to(user._id).emit("message received", newMsgRecived); // Emit message received event to specific user
                }
            });
        });
    });
}

module.exports = {
    initializeSocket
};
