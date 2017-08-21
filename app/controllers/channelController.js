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
const ChannelService = require('../services/channelService');
const redis = require('redis');
const helper = require('../common/helper');
const msg = require('../common/messages');


/**
 * Get a list of all the channels titles
 */
function getChannelTitles(req, res) {
	ChannelService.getChannelTitles(req, res).then(function(data) {
		if(data) {
			res.status(200).json(data);
			helper.responseHandler(null, msg.channel.getChannelList.getChannelsSuccess);
		}
	}, function(err) {
		if(err) {
			res.status(500).json(err);
			helper.responseHandler(err, 'something went wrong while getting channel list');
		}
	});
}

/**
 * Create a new Channel
 */
function createNewChannel(req, res) {
	console.log(req.body);
	ChannelService.createNewChannel(req, res).then(function(data) {
		if(data) {
			res.status(200).json(data);
			console.log('channel created');
			helper.responseHandler(null, data);
		}
	}, function(err) {
		if(err) {

			helper.responseHandler(err);
			res.status(400).json('channel title already exists!');
		}
	});
}

/**
 * Get a channel by Id
 */
function getChannelByTitle(req, res) {
	if(req.params.title & req.body) {
		ChannelService.getChannelByTitle(req).then(function(data) {
			if(data) {
				res.status(200).json(data);
			}
		}).catch(function(err) {
			if(err) {
				helper.responseHandler(err, 'get channel by title failed!');
				res.status(400).json(err.name + ": " + err.message);
			}
		});
	} else {
		res.status(400).json('bad arguments');
	}
	
}

/**
 * Update a specific channel
 */
function updateChannelByTitle(req, res) {
	if(req.params.title) {
		ChannelService.updateChannelByTitle(req).then(function(data) {
			if(data) {
				res.status(200).json(data);
			} else {
				res.status(500).json('requested channel is not registered in channels list');
			}
		}).catch(function(err) {

			if(err) {
				helper.responseHandler(err, 'update channel by title failed!')
				res.status(400).json(err.name + ": " + err.message);
			}
		});
	} else {
		res.status(400).json('bad arguments');
	}
}

/**
 * delete a channel
 */
function deleteChannelByTitle(req, res) {
	if(req.params.title) {
		ChannelService.deleteChannelByTitle(req).then(function(data) {
			res.status(200).json(data);
		}).catch(function(err) {
			if(err) {
				helper.responseHandler(err);
				res.status(400).json(err.name + ": " + err.message);
			}
		});
	} else {
		res.status(400).json('bad arguments!');
	}
}


/**
 * delete a channel
 */
function joinChannelByTitle(req, res) {
	if(req.params.title) {
		ChannelService.joinChannelByTitle(req).then(function(data) {
			if(data) {
				res.status(200).json(data);
			}
		}).catch(function(err) {
			if(err) {
				helper.responseHandler(err);
				res.status(400).json({Error: err.name, Message: err.message});
			}
		})
	} else {
		res.status(400).json('bad arguments!');
	}
}


/**
 * delete a channel
 */
function leaveChannelByTitle(req, res) {
	if(req.params.title) {
		ChannelService.leaveChannelByTitle(req).then(function(data) {
			if(data) {
				res.json(200).json(data);
			}
		}).catch(function(err) {
			if(err) {
				helper.responseHandler(err);
				res.status(400).send({Error: err.name, Message: err.message});
			}
		});
	} else {
		res.status(400).send('bad arguments!');
	}
}


/**
 * delete a channel
 */
function getChannelUsersByTitle(req, res) {
	if(req.params.title) {
		ChannelService.getChannelUsersByTitle(req).then(function(data) {
			if(data) {
				res.status(200).json(data);
			}
		}).catch(function(err) {
			if(err) {
				helper.responseHandler(err);
				res.status(400).send({Error: err.name, Message: err.message});
			}
		});
	} else {
		res.status(400).send('bad arguments');
	}
}


/**
 * delete a channel
 */
function getAllMessagesByTitle(req, res) {
	if(req.params.title) {
		ChannelService.getAllMessagesByTitle(req).then(function(data) {
			if(data) {
				res.status(200).json(data);
			}
		}).catch(function(err) {
			if(err) {
				helpers.responseHandler(err);
				res.status(400).send({Error: err.name, Message: err.message});
			}
		});
	} else {
		res.status(400).send('bad arguments');
	}
}

/**
 * delete a channel
 */
function postNewMessage(req, res) {
	if(req.params.title) {
		ChannelService.postNewMessage(req)
		.then(function(data) {
			if(data) {
				res.status(200).send(data);
			}
		}).catch(function(err) {
			responseHandler(err);
			res.status(400).send({Error: err.name, Message: err.message});
		});
	} else {
		res.status(400).json('bad arguments');
	}
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
	// channel operations
	getChannelTitles,
	createNewChannel,
	updateChannelByTitle,
	getChannelByTitle,
	deleteChannelByTitle,

	// user operations
	getChannelUsersByTitle,
	joinChannelByTitle,
	leaveChannelByTitle,
	
	// message operations
	getAllMessages,
	postNewMessage,
	getMessageById,
	updateMessage,
	deleteMessage
};