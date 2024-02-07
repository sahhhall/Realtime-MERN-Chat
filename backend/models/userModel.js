const mongoose = require('mongoose');
const url = ["http://res.cloudinary.com/dgvcq2pqp/image/upload/v1707302838/kzhduh1zitzidiw1gxxl.png"]
const urlToPic = Math.floor(Math.random() * url.length)
const bcrypt = require('bcrypt')

const userModal = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: url[urlToPic]
    }
}, {timestamps: true})

// return this when user querying (logintime) and comparepassword
userModal.methods.matchPassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass,this.password)
}


//before inserting pass to dB bcrypting
userModal.pre("save", async function (next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model("User", userModal);
module.exports = User
