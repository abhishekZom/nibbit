/*
 * Copyright (C) 2017 nibbit., All Rights Reserved.
 */

'use strict';

/**
 * this file contains all generic messages to be logged on the console as well as messages for the responses 
 * the file serves the purposes of internationalization and code separation
 *
 * @author      AON
 * @version     1.0.0
 */


var msg = {
    wentWrong : "something went wrong",
    notAllowed : "not allowed",
    
    channel: {
        notExist : "channel title does not exist",
        getChannelList: {
            getChannelsSuccess : "get all channels list successful"
        },
        createNewChannel: {
            uniqueTitleFailed : "unique channel name test failed",
            uniqueTitlePassed : "unique channel name test passed",
            alreadyExists : "channel already exists",
            addedToList : "channel added to title list",
            created: "new channel created"
        },
        getChannelByTitle: {
            getByTitleSuccess : "get channel by title successful"
        },
        updateChannelByTitle: {

        },
        deleteChannelByTitle: {

        },
	    getChannelUsers: {

        },
	    joinChannel: {

        },
	    leaveChannel: {

        },
	    getAllMessages: {

        },
        createNewMessage: {

        },
        getMessageById: {

        },
        updateMessage: {

        },
	    deleteMessage: {

        }
    }
};

module.exports = msg;