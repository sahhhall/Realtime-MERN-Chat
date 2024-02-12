const express = require ('express')
const { authProtect } = require('../middlewares/userAuth');
const { sendMessage, fullMessages, fetchMessages } = require('../controllers/messageController');
const router = express.Router()


router.route("/").post(authProtect, sendMessage);
//  fetch all chats from one single chat 
// router.route('/:chatId').get(authProtect, fetchMessages );
router.route('/:chatId').get(authProtect, fullMessages );


module.exports = router