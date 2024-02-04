const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/tokenGenerator')
const registerUser = asyncHandler(async (req,res) => {
    const { name, mail, password, picture } = req.body
    if  (!name || !mail || !password ){
        res.status(400);
        throw new Error("please Fill all fields")
    }

    const userExist = await User.findOne({ email:mail }) 
    if(userExist){
        res.status(400)
        throw new Error("Email alreaady exist")
    }
    const user = await User.create({
        name: name,
        email: mail,
        password: password,
        picture: picture
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            picture: user.picture,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("User creation failed")
    }
})


const authUser = asyncHandler(async (req,res) => {
    const { mail, password} = req.body;
    const user = await User.findOne({ email:mail });
    if(!user){
        res.status(401)
        throw new Error("no registered users with this mail")
    }
    else{
        if(await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                picture: user.picture,
                email: user.email,
                token: generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error("incorrect password")
        }
    }
})

module.exports = {
    registerUser,
    authUser
}