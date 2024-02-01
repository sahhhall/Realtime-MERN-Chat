const mongoose = require('mongoose');


const userModal = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true,
        default: url[urlToPic]
    }
}, {timestamps: true})


const url = ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.clevelandpublicsquare.com%2Fpost%2Fmarvel-super-heroes-in-public-square&psig=AOvVaw1S_RAwAf9hbYu76Rc7Qa6U&ust=1706860826325000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMiezpzWiYQDFQAAAAAdAAAAABAE", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Ffree-png-zeggg&psig=AOvVaw1S_RAwAf9hbYu76Rc7Qa6U&ust=1706860826325000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMiezpzWiYQDFQAAAAAdAAAAABAM", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fclipart-library.com%2Fmarvel-superheroes-cliparts.html&psig=AOvVaw1S_RAwAf9hbYu76Rc7Qa6U&ust=1706860826325000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMiezpzWiYQDFQAAAAAdAAAAABAV", "https://i0.wp.com/www.michigandaily.com/wp-content/uploads/2023/06/Untitled_Artwork-116.png?fit=1200%2C800&ssl=1"]
const urlToPic = Math.floor(Math.random() * url.length)

const User = mongoose.model("User", userModal);
module.exports = User
