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
const redis = require('../../db');

/**
 * Get a list of all the channels
 */
function getAllChannels(cb) {
	redis.smembers('users', function(err, reply) {
		if(!err) {
			cb(null, reply);
		}
		return cb(err);
	});
}

/**
 * Create a new Channel
 * 
 * @param {object} [body] [requrest body]
 */
function createNewChannel(body, cb) {
	let title = body.title;
	redis.sadd(["channels", title], function(err, reply) {
		if(!err) {
			redis.HMSET(title, body, function(err, reply) {
				if(!err) {
					cb(null, title + " added successully to list of users!");
				}
				else cb(err);
			});
		}
		else cb(err);
	});
}

/**
 * Update a specific channel
 */
function updateChannel(body, cb) {
	let title = body.title;
	redis.smembers("channels", function(err, reply) {
		if(!err) {
			if(reply.indexOf(title) > -1) {
				redis.HDEL("title", function(err, success) {
					if(!err) {
						HMSET(title, body, function(err, reply) {
							if(!err) {
								cb(null, title + " updated successfully!");
							}
							else cb(err);
						});
					}
					else cb(err);
				});
			}
			else cb("Error: requested channel does not exist!");
		}
		else cb(err);
	});
}

/**
 * Get a channel by Id
 */
function getChannelById(body, cb) {
	let title = body.title;
	redis.members("channels", function(err, reply) {
		if(!err) {
			if(reply.indexOf(title) > -1) {
				redis.HGETALL(title, function(err, reply) {
					if(!err) {
						cb(null, reply);
					}
					else cb(err);
				});
			}
			else cb("Error: requested channel does not exist!");
		}
		else cb(err);
	});
}

/**
 * delete a channel
 */
function deleteChannel(body, cb) {
	let title = body.title;
	redis.smembers("channels", function(err, reply) {
		if(!err) {
			if(reply.indexOf(title) > -1) {
				redis.srem("channels", title, function(err, success) {
					if(!err) {
						redis.HDEL(title, function(err, success) {
							if(!err) {
								cb(null, title + " updated successfully!");
							}
							else cb(err);
						});
					}
					else cb(err);
				});
			}
			else cb("Error: requested channel does not exist!");
		}
		else cb(err);
	});
}

/**
 * delete a channel
 */
function getChannelUsers(body, cb) {
	let title = body.title;
	redis.members("channels", function(err, reply) {
		if(!err) {
			if(reply.indexOf(title) > -1) {
				redis.HGETALL(title, function(err, reply) {
					if(!err) {
						cb(null, reply.users);
					}
					else cb(err);
				});
			}
			else cb("Error: requested channel does not exist!");
		}
		else cb(err);
	});
}

/**
 * delete a channel
 */
function joinChannel(body, cb) {
	let title = body.title;
	redis.smembers("channels", function(err, reply) {
		if(!err) {
			if(reply.indexOf(title) > -1) {
				redis.HDEL("title", function(err, success) {
					if(!err) {
						HMSET(title, body, function(err, reply) {
							if(!err) {
								cb(null, title + " updated successfully!");
							}
							else cb(err);
						});
					}
					else cb(err);
				});
			}
			else cb("Error: requested channel does not exist!");
		}
		else cb(err);
	});
}

/**
 * delete a channel
 */
function leaveChannel() {
	console.log("dsf");
	return "sdf";
}

/**
 * delete a channel
 */
function getAllMessages() {
console.log("dsf");
	return "sdf";
}	

/**
 * delete a channel
 */
function createNewMessage() {
	console.log("dsf");
	return "sdf";
}

/**
 * delete a channel
 */
function getMessageById() {
	console.log("dsf");
	return "sdf";
}

/**
 * delete a channel
 */
function updateMessage() {
	console.log("dsf");
	return "sdf";
}

/**
 * delete a channel
 */
function deleteMessage() {
	console.log("dsf");
	return "sdf";
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
