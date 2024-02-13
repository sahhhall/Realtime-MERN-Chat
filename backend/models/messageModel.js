const mongoose = require('mongoose');


const message = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Chat'
    },
    status:{
        type:String,
        default:"sent",
        enum:["sent","delivered","seen"]
    }
},
    {
        timestamps: true
    }
)


const Message = mongoose.model("Message", message);
module.exports = Message ;