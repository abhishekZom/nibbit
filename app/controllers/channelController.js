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
const bluebird = require('bluebird');


function successHandler(data) {
	console.log(data);
}

function errorHandler(err) {
	console.log(err);
}


/**
 * Get a list of all the channels
 */
function getAllChannels(req, res) {
	ChannelService.getAllChannels(function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * Create a new Channel
 */
function createNewChannel(req, res) {
	ChannelService.createNewChannel(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * Update a specific channel
 */
function updateChannel(req, res) {
	ChannelService.updateChannel(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * Get a channel by Id
 */
function getChannelById(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function deleteChannel(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function getChannelUsers(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function joinChannel(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function leaveChannel(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function getAllMessages(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function createNewMessage(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function getMessageById(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function updateMessage(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
}

/**
 * delete a channel
 */
function deleteMessage(req, res) {
	ChannelService.getChannelById(req.body, function(err, data) {
		if(!err) {
			res.json(data);
			successHandler(data);
		}
		else errorHandler(err);
	});
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
