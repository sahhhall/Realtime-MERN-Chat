const express = require('express')
const router = express.Router();
const { authProtect } = require('../middlewares/userAuth');
const { accessChat, getChats, createGrpChat, renameGrp, addTogroup, exitFromGroup } = require('../controllers/chatController');



router.route('/').post(authProtect, accessChat)
router.route('/').get(authProtect, getChats )
router.route('/group').post(authProtect, createGrpChat)
router.route('/rename').put(authProtect, renameGrp)
router.route('/exitgroup').put(authProtect, exitFromGroup);
router.route('/addtogroup').put(authProtect, addTogroup);




module.exports = router