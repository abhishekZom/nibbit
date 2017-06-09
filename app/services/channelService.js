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
const redis = require('redis');

creds = JSON.parse(data);
client = redis.createClient('redis://' + creds.user + ':' + creds.password + '@' + creds.host + ':' + creds.port);

/**
 * Get a list of all the channels
 */
function getAllChannels() {
	client.
}

/**
 * Create a new Channel
 */
function createNewChannel(body) {
	
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
