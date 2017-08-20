/*
 * Copyright (C) 2017 nibbit., All Rights Reserved.
 */

'use strict';

/**
 *	this file includes the models for redis keys for the entire app.
 *
 * @author      AON
 * @version     1.0.0
 */

var rKeys = {};

// utility method for generating redis keys with provided arguments
function rk() {
  return Array.prototype.slice.call(arguments).join(':');
}


// basic model definitions
rKeys.base = 'nibbit';									                // base string for entire app
rKeys.nibbiters = rk(rKeys.base, 'nibbiters');			    // list of nibbiters titles
rKeys.channelTitles = rk(rKeys.base, 'channelTitles');	// list of channel titles
rKeys.messages = rk(rKeys.base,'messages');				      // list of all the messages from all channels and all users
rKeys.channels = rk(rKeys.base,'channels');				      // hashe that contain the channels properties
rKeys.users = rk(rKeys.base, 'users');                  // list of all the users currently using nibbit.
rKeys.channel = rk(rKeys.base, 'channel');              // a single channel hash

// channel properties
rKeys.channelProps = {
  title : "title",
  users : "users",
  usersCount : "userCount",
  messages : "messages",
  messagesCount : "messageCount",
  type : "type",
  createAt : "createdAt"
};

// user properties
rKeys.userProps = {
  userName : "userName",
  role : "role",
  joinedAt : "joinedAt"
}

// message properties
rKeys.messageProps = {
  userName: "userName",
  message : "message",
  postedAt: "postedAt"
}

//bind the redis key generator
rKeys.rk = rk;                        // utitily to join keynames in hashes for redis using colons.
module.exports = rKeys;               // export it all