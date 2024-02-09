const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')
const { json } = require('express')

// access particular user chat eg: in whatsapp we've lot of chats if we want one then this thing work
const accessChat = asyncHandler(async (req,res) => {
    const  { userId } = req.body

    var chat =  await Chat.find({
        isGroupChat : false,
        $and:[
            { users : { $elemMatch : { $eq : req.user._id } } },
            { users : { $elemMatch : { $eq : userId } } }
        ]
    })
    .populate("users","-password")
    .populate("latestMessage")
    
    chat = await User.populate(chat,{
        path: "latestmessage.chat",
        select: "name email picture"
    })

    if( chat.length >0 ){
        res.send(chat[0])
    }else{
        const chatData = {
            chatName : "sender",
            isGroupChat : false,
            users: [req.user._id,userId]
        };
        try{
            const createChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createChat._id}).populate("users","-password")
            res.status(200).
            send(fullChat[0])
        }catch(err){
                res.status(400)
                throw new Error(err.message)
        }
    }
})

const getChats = asyncHandler(async (req,res) => {
    try{
         Chat.find({ users: { $elemMatch: { $eq: req.user._id }}})
         .populate("users", "-password")
         .populate("groupAdmin", "-password")
         .populate("latestMessage")
         .sort({updatedAt:-1})
         .then(async(result) => {
            result = await User.populate(result,{
                path: "latestmessage.chat",
                select: "name email picture"
            })
            res.status(200).json(result)
         })
    }catch(err){
        res.status(400)
        throw  new Error(err.message)
    }
})

const createGrpChat = asyncHandler(async(req,res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"fill all"})
    }
    var usersArr = req.body.users;
    var grpName = req.body.name;
    var users = JSON.parse(usersArr)
    
    if( users.length < 1     ) return res.status(400).send("More than 2 users need")

    // now  i only get all rest users expect creator so push him 
    users.push(req.user)

    try{
        const grpChat = await Chat.create({

            chatName: grpName,
            users: users,
            groupAdmin: req.user,
            isGroupChat: true
        })
            const fullGrpCht = await Chat.findOne({_id: grpChat._id}).populate("users","-password")
            .populate("groupAdmin","-password")
            
            res.status(200).json(fullGrpCht)
    }catch(err){
        res.send(400)
        throw  new Error(err.message)
    }
})

const renameGrp = asyncHandler(async (req,res) => {
    const { groupChatId , grpChtName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate (groupChatId,{
        chatName : grpChtName
    },
    // what if user didnt give neww name then return with old 
    {
        new:  true
    }).populate("users","-password")
    .populate("groupAdmin","-password")

    if(!updatedChat) {
        res.status(404)
        throw new Error("Chat nit found")
    }
    else {
        res.json(updatedChat)
    }
})

const addTogroup = asyncHandler(async (req,res) => {
    const { groupChatId , userId } = req.body;
    const addedUserData = await Chat.findByIdAndUpdate(groupChatId,
        {
            $push: {
                users:userId
            }
        },{
            new:true
        }
        )
        .populate("users","-password")
        .populate("groupAdmin","-password")
        res.json(addedUserData)
        if( !addedUserData ) {
            res.status(404)
            throw new Error("user not found")
        }else{
            res.json(addedUserData)
        }
      

})

const exitFromGroup = (async (req,res) =>{
    const { groupChatId , userId } = req.body;
    const removeUserUpdation = await Chat.findByIdAndUpdate(groupChatId,{
        $pull: {
            users: userId
        }
    },{
        new: true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if( !removeUserUpdation ) {
        res.status(404)
        throw new Error("user not found")
    }else{
        res.json(removeUserUpdation)
    }
    
})




module.exports = {
    accessChat,
    getChats,
    createGrpChat,
    renameGrp,
    addTogroup,
    exitFromGroup
}