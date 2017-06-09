// router file for channels

const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channelsController');


// handlers for /channels
router.route('/channels')
	.get(ChannelController.getAllChannels)
	.post(ChannelController.createNewChannel);
// handlers for a single channel by Id
router.route('/channels/channelId')
	.get(ChannelController.getChannelById)
	.put(ChannelController.updateChannel)
	.delete(ChannelController.deleteChannel);

router.route('channels/channelId/join')
	.post(ChannelController.joinChannel);

router.route('channels./channelId/leave')
	.post(ChannelController.leaveChannel);

router.route('channels/channelId/messages')
	.post(ChannelController.postNewMessage)
	.get(ChannelController.getAllMessages);

router.route('channels/channelId/messages/messageId')
	.get(ChannelController.getMessageById)
	.put(channelController.updateMessage)
	.delete(ChannelController.deleteMessage);

module.exports = router;