// router file for channels

const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channelController');

// handlers for /channels
router.route('/channels')
	.get(ChannelController.getChannelTitles)
	.post(ChannelController.createNewChannel);

// handlers for a single channel by title
router.route('/channels/:title')
	.get(ChannelController.getChannelByTitle)
	.put(ChannelController.updateChannelByTitle)
	.delete(ChannelController.deleteChannelByTitle);

// handler for joining process
router.route('/channels/:title/join')
	.post(ChannelController.joinChannelByTitle);

// handler for leaving process
router.route('channels./channelId/leave')
	.get(ChannelController.leaveChannelByTitle);

// // handler for messages
// router.route('channels/channelId/messages')
// 	// .put(ChannelController.postNewMessage)
// 	.get(ChannelController.getAllMessages);

// // handler for single message by Id
// router.route('channels/channelId/messages/messageId')
// 	.get(ChannelController.getMessageById)
// 	// .put(ChannelController.updateMessage)
// 	.delete(ChannelController.deleteMessage);

console.log('routes loaded!');
module.exports = router;