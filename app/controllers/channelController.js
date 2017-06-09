/*
 * Copyright (C) 2017 nibbit., All Rights Reserved.
 */

'use strict';

/**
 * User resource service contract
 * Some of the modules this service depends on will be resolved at deployment time.
 *
 * @author      AON
 * @version     1.0.0
 */

// import modules
const ChannelModel = require('../models/channelModel');
const ChannelService = require('../services/channelService');
const redis = require('redis');

/**
 * Get a list of all the channels
 */
function getAllChannels(req, res) {
	let response = ChannelService.getAllChannels();
	res.status(response.status || http.status.OK).json(response.model);
}

/**
 * Create a new Channel
 */
function createNewChannel(req, res) {
	let response = ChannelService.createNewChannel(req.body);
	res.status(response.status || http.status.OK).json(response.model);
}

/**
 * Update a specific channel
 */
function updateChannel() {

}

/**
 * Get a channel by Id
 */
function getChannelById() {

}

/**
 * delete a channel
 */
function deleteChannel() {

}

/**
 * delete a channel
 */
function getChannelUsers() {

}

/**
 * delete a channel
 */
function joinChannel() {

}

/**
 * delete a channel
 */
function leaveChannel() {

}

/**
 * delete a channel
 */
function getAllMessages() {

}

/**
 * delete a channel
 */
function createNewMessage() {

}

/**
 * delete a channel
 */
function getMessageById() {

}

/**
 * delete a channel
 */
function updateMessage() {

}

/**
 * delete a channel
 */
function deleteMessage() {

}

module.exports = {
	getAllChannels,
	createNewChannel, 
	updateChannel,
	getChannelById,
	deleteChannel,
	getChannelUsers,
	joinChannel,
	leaveChannel,
	getAllMessages,
	createNewMessage,
	getMessageById,
	updateMessage,
	deleteMessage
};
