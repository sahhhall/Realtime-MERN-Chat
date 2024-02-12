const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');



const sendMessage = asyncHandler(async (req,res) => {
    console.log("nothing too worry am here",req.body.content);
    const { content, chatId } = req.body;
    const loggedUser = req.user._id;
    if ( !content || !chatId ) {
        console.log("data passed value recheck");
        return res.status(400)
    }
    var newMsg = {
        sender: loggedUser ,
        content: content ,
        chat: chatId
    }
    try{
        var message = await Message.create(newMsg);
        message = await message.populate("sender","name picture");
        message = await message.populate("chat");
        message = await User.populate(message,
          {  path:'chat.users',
             select:'name picture email'
            }
        )
        //  need updation chat modal latestMessage after this 
        await Chat.findByIdAndUpdate(chatId,{
            latestMessage: message
        })
        res.status(201).json(message)
    }catch (error) {
        console.error("Error sending message:", error);
        res.status(400).json({ error: "Failed to send message." });
    }

})

const fullMessages = asyncHandler(async ( req, res ) => {
    try{
        console.log("am here");
        const reqChatId = req.params.chatId
        const messages =await Message.find({chat:reqChatId}).populate("sender","name picture email")
        .populate("chat");
        res.status(200).json(messages);
    }catch(error){
        console.error("Error sending message:", error);
        res.status(400).json({ error: "Failed to load messages." });
    }
})

const fetchMessages = asyncHandler(async(req,res) => {
    try{
            const page = req.query.page ? parseInt( req.query.page ) : 1;
            console.log(page);
            const reqChatId = req.params.chatId;
            const pageSize = 10;
            const messages =await Message.find({chat:reqChatId}).populate("sender","name picture email")
            .populate("chat")
            .sort({ createdAt: -1 })
            .skip( (page - 1) * pageSize)
            .limit( pageSize )
            res.status(200).json(messages)
    }catch(error){
        console.log("error fetching message",error);
        res.status(400).json( { error: "failed to fetch datta"} )
    }
})

module.exports = {
    sendMessage,
    fullMessages,
    fetchMessages
}