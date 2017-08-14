// router file for channels

const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channelController');

var channelRoutes = function(req, res) {
	console.log("success!");
	res.end();
};

// handlers for /channels
router.route('/channels')
	.get(ChannelController.getAllChannels)
	.post(ChannelController.createNewChannel);

// handlers for a single channel by Id
router.route('/channels/channelId')
	.get(ChannelController.getChannelById)
	.put(ChannelController.updateChannel)
	.delete(ChannelController.deleteChannel);

// handler for joining process
router.route('channels/channelId/join')
	.get(ChannelController.joinChannel);

// handler for leaving process
router.route('channels./channelId/leave')
	.get(ChannelController.leaveChannel);

// handler for messages
router.route('channels/channelId/messages')
	// .put(ChannelController.postNewMessage)
	.get(ChannelController.getAllMessages);

// handler for single message by Id
router.route('channels/channelId/messages/messageId')
	.get(ChannelController.getMessageById)
	// .put(ChannelController.updateMessage)
	.delete(ChannelController.deleteMessage);

console.log('routes loaded!');
module.exports = router;