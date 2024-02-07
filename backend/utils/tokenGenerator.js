const jwt = require('jsonwebtoken')



const generateToken = (userId) => {
    return jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: 326400
    })
}


module.exports = generateToken