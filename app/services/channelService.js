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
const redis = require('../../db');
const rKeys = require('../models/rKeys');
const moment = require('moment');
const helper = require('../common/helper');

var failCheckFlag = false;

/**
 * Get a list of all the channels titles
 * @param  {Function} cb 	the callback for handeling success and error
 * @return {[type]}      	error object
 */
function getChannelTitles(req, res) {
	return redis.smembersAsync(rKeys.channelTitles);
}


/**
 * Create a new channel
 * @param  {object}   body the request body
 * @param  {Function} cb   callback for handeling the success and error
 */
function createNewChannel(req, res) {
	// check if the channel already exists
	return redis.sismemberAsync(rKeys.channelTitles, req.body.title)
	.then(function(data) {
		// if channel exists throw error
		if(data == 1) {
			console.log('unique channel name test failed');
			throw new Error('channel already exists');
		//if channel title is unique first save the title to channel titles list
		} else if(data ==0) {
			console.log('unique channel name test passed');
			return redis.saddAsync(rKeys.channelTitles, req.body.title);
		}
	}, function(err) {
		throw new Error('failed to check channel existence');
	})
	.then(function(data) {
		console.log('channel added to title list');
		// finally save the channel hash
		return redis.hmsetAsync(
			rKeys.rk(rKeys.channels, req.body.title),
			rKeys.channelProps.title, req.body.title,
			rKeys.channelProps.usersCount, 0,
			rKeys.channelProps.messagesCount, 0,
			rKeys.channelProps.type, req.body.type,
			rKeys.channelProps.createAt, moment().valueOf()
		);
	}, function(err) {
		redis.sremAsync(rKeys.channelTitles, req.body.title)
		.then(null, function(err) {
			throw new Error('addition of channel object failed, rollback action addition to channel list failed')
		});
		throw new Error('failed to add the channel object');
	});
}


/**
 * Get a single channel by Id
 * @param  {object}   body the request body
 * @param  {Function} cb   the callback for handeling success and error
 */
function getChannelByTitle(req) {
	return redis.sismemberAsync(rKeys.channelTitles, req.params.title)
	.then(function(data) {
		if(data && data == 0) {
			throw new Error('requested channel does not exist');
		} else if(data == 1) {
			return redis.hgetallAsync(rKeys.rk(rKeys.channels, req.params.title));
		}
	});
}


/**
 * update an existing channel
 * @param  {object}   body the request body
 * @param  {Function} cb   the callback for handeling the success and error
 */
function updateChannelByTitle(req) {
	// check if channel exists
	return redis.sismemberAsync(rKeys.channelTitles, req.params.title)
	.then(function(reply) {
		if(reply && reply == 0) {
			// throw if channel does not exist
			throw new Error('requested channel does not exist');
		} else if(reply == 1) {
			// else proceed by removing from channel list first
			return redis.sremAsync(rKeys.channelTitles, req.params.title);
		}
	})
	.then(function(data) {
		return redis.saddAsync(rKeys.channelTitles, req.body.title);
	})
	.then(function(data) {
		if(data) {
			var promiseArray = [];
			var setSingleHashProp = function(prop, val) {
				return redis.hset(rKeys.rk(rKeys.channels, req.params.title), prop, val);
			}
			for(var prop in req.body) {
				promiseArray.push(setSingleHashProp(prop, req.body[prop]));
			}
			return Promise.all(promiseArray).catch(function(err) {
				throw new Error('error occurred while updating channels properties');
			});
		}
	});
}


//need to take care of exception in case channel gets deleted from list but fails while deleting the channel hash
/**
 * delete a channel
 */
function deleteChannelByTitle(req) {
	// check if the channel exists
	return redis.sismember(rKeys.channelTitles, req.params.title)
	.then(function(reply) {
		if(reply == 1) {
			return redis.sremAsync(rKeys.channelTitles, req.params.title);
		} else if(reply == 0) throw new Error('requested channel does not exist');
	})
	.then(function(reply) {
		if(reply == 1) {
			return redis.delAsync(rKeys.rk(rKeys.channels, req.params.title));
		} else if(reply == 0) {
			throw new Error('error occurred while removing channel from list');
		}
	})
	.then(function(reply) {
		if(reply == 1) {
			return new Promise(function(resolve, reject) {
				resolve(reply);
			});
		} else if(reply == 0) {
			return redis.saddAsync(rKeys.channelTitles, req.params.title)
		}
	})
	.then();
}


/**
 * join a channel
 */
function joinChannelByTitle(req) {
	//first check if the requested channel exists
	return redis.sismemberAsync(rKeys.channelTitles, req.params.title)
	.then(function(reply) {
		if(reply == 1) {
			//check if the user already exists
			return redis.sismemberAsync(rKeys.nibbiters, req.body.userName);
		} else if(reply == 0) {
			throw new Error('requested channel does not exist');
		}
	})
	.then(function(reply) {
		if(reply == 0) {
			// if user is new add it to list of users
			return redis.saddAsync(rKeys.nibbiters, req.body.userName);
		} else if(reply == 1) {
			throw new Error('user already registered with atleast one channel');
		}
	})
	.then(function(reply) {
		if(reply == 1) {
			// finally add user to the channel
			return redis.hmsetAsync(
				rKeys.rk(rKeys.channels, req.params.title, rKeys.channelProps.users),
				rKeys.userProps.userName, req.body.userName,
				rKeys.userProps.role, req.body.role
			);
		} else if(reply == 0) {
			throw new Error('Error occurred while adding user to all users list');
		}
	}, function(err) {
		throw new Error('Error occurred while adding user to all users list');
	})
	.then(function(reply) {
		return new Promise(function(resolve, reject) {
			// if user object addition is success, resolve it with reply
			if(reply == 'OK') resolve(reply);
			// if user object addition is failure, remove user from user list and reject with reply
			else {
				console.log('addition of user object to channel failed');
				redis.sremAsync(rKeys.nibbiters, req.body.username)
				.then(function(reply) {
					if(reply == 1) console.log('user addition to user list rolled back');
					if(reply == 0) throw new Error("user addition rollback action failed");
				}, function(err) {
					throw new Error("user addition rollback action failed");
				});
				reject(reply);
			}
		});
	}, function(err) {
		redis.sremAsync(rKeys.nibbiters, req.body.username);
		throw err;
	});
}


/**
 * delete a channel
 */
function leaveChannelByTitle(req) {
	// check if the channel exists
	return redis.sismemberAsync(rKeys.channelTitles, req.params.title)
	.then(function(reply) {
		if(reply == 1) {
			// check if the user is registered to the channel
			return redis.sismember(rKeys.channeltitles, req.body.userName);
		} else if(reply == 0) {
			throw new Error('requested channel does not exist');
		}
	})
	.then(function(reply) {
		if(reply == 1) {
			// register the user in the list of all users
			return redis.sremAsync(rKeys.nibbiters, req.body.userName);
		} else if(reply == 0) {
			throw new Error('the user is not registered with any channels');
		}
	})
	.then(function(reply) {
		if(reply == 1) {
			// finally add the user property to the channel object
			return redis.del(rKeys.rk(rKeys.channels, req.params.title, rKeys.channelProps.users));
		} else if(reply == 0) {
			throw new Error('failed to remove the user from all users list');
		}
	}, function(err) {
		if(err) {
			throw new Error('failed to remove the user from all users list');
		}
	})
	.then(function(reply) {
		return new Promise(function(resolve, reject) {
			if(reply == 1) {
				resolve(reply);
			} else if(reply == 0) {
				reject('failed to leave the channel')
			}
		})
	}, function(err) {
		redis.saddAsync(rKeys.nibbiters, req.body.userName)
		.then(function(reply) {
			return new Promise(function(resolve, reject) {
				if(reply == 1) {
				resolve(reply);
				} else {
					reject(err);
				}
			});
			
		}, function(err) {
			return new Promise(function(err) {
				reject(err);
			});
		});
		reject('failed to leave the channel');0
	})
}

/**
 * get all users for a channel
 */
function getChannelUsersByTitle(req) {
	// check if the requested channel exists
	return redis.sismemberAsync(rKeys.channelTitles, req.params.title)
	.then(function(reply) {
		if(reply == 1) {
			// return all users in that channel
			return redis.hgetallAsync(rKeys.rk(rKeys.channels, req.params.title, rKeys.channelProps.users));
		} else if(reply = 0) {
			throw new Error('requested channel does not exist');
		}
	});
}


/**
 * get all messages for a channel
 */
function getAllMessagesByTitle(req) {
	// check if the channel exists
	return redis.sismember(rKeys.channelTitles, req.params.title)
	.then(function(reply) {
		if(reply == 1) {
			
		}
	})
}

/**
 * delete a channel
 */
function postNewMessage(req) {
	// check if the channel exists
	return redis.sismemberAsync(rKeys.channelTitles, req.params.title)
	.then(function(reply) {
		if(reply == 1) {
			// check if the user is registered with any channel
			return redis.sismemberAsync(rKeys.nibbiters, req.body.username);
		}
		else if(reply == 0) {
			throw new Error('the requested channel does not exist');
		}
	})
	.then(function(reply) {
		if(reply == 1) {
			// add message to all messages list
			return redis.saddAsync(rKeys.messages, req.body.message);
		} else if(reply == 0) throw new Error('the user is not registered with any channel');
	})
	.then(function(reply) {
		if(reply == 1) {
			// finally add message to the channel
			return redis.hmsetAsync(
				rKeys.rk(rKeys.channels, req.params.title, rKeys.channelProps.messages),
				rKeys.messageProps.message, req.body.message,
				rKeys.messageProps.userName, req.body.userName,
				rKeys.messageProps.postedAt, moment().valueOf()
			)
		} else  if(reply == 0) {
			throw new Error('addition of message to all messages list failed');
		}
	})
	.then(function(reply) {
		return new Promise(function(resolve, reject) {
			if(reply == 1) {
				resolve (reply);
			} else {
				console.log('addition of message object to the channel failed');
				redis.sremAsync(rKeys.messages, req.body.messages)
				.then(function(reply) {
					if(reply) {
						throw new Error('message addition to list rollback action successful');
					} else {
						throw new Error('message addition to list rollback action failed');
					}
				});
			}
		});
	});
}

/**
 * update a message
 */
function updateMessage() {
	console.log("dsf");
	return "sdf";
}

/**
 * delete a message
 */
function deleteMessage(req) {
	// check if the channel exists
	redis.sismemeberAsync(rKeys.channelTitles, req.params.title)
	.then(function(reply) {
		if(reply == 1) {
			// check if the message has been posted previously on any channel
			return redis.sismemberAsync(rKeys.messages, req.body.message);
		} else if(reply == 0) {
			throw new Error('the requested channel does not exist');
		}
	})
	.then(function(reply) {
		if(reply == 1) {
			// remove the message from the list of messages
			return redis.sremAsync(rKeys.messages, req.body.message);
		} else if(reply == 0) {
			throw new Error('the requested message does not exist');
		}
	})
	.then(function(reply) {
		if(reply == 1) {
			return redis.delAsync(rKeys.rk(rKeys.channels, req.params.title, rKeys.messageProps.message));
		} else if(reply == 0) {
			throw new Error('failed to remove the message from all messages list');
		}
	})
	.then(function(reply) {
		return new Promise(function(resolve, reject) {
			if(reply == 1) {
				resolve(reply);
			} else if(reply == 0) {
				console.log("action to remove the message failed");
				redis.saddAsync(rKeys.messages, req.body.message)
				.then(function(innerReply) {
					if(innerReply == 1) {
						throw new Error('action to remove the message failed! Removal from the messages list rolled back!');
					} else {
						throw new Error('action to remove the message failed! message list removal rollback action failed!');
					}
				});
			}
		});
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
	updateMessage,
	deleteMessage
};