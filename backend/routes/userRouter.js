const express = require('express');
const router = express.Router();
const { registerUser, authUser, getAllUsers, } = require('../controllers/userController'); 
const { authProtect } = require('../middlewares/userAuth');


router.route("/").post(registerUser).get(authProtect,getAllUsers)
router.post('/login', authUser)

module.exports = router