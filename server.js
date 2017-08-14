/*
 * Copyright (C) 2017 nibbit., All Rights Reserved.
 */

'use strict';

/**
 * Entry file for the server
 *
 * @author      AON
 * @version     1.0.0
 */


// import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const redis = require('./db');

// app instance created and passed to server instance which in turn is passed to socket instance
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// import config and bind to the app instance
const config = require('./config/config');

// configure server port
const port = config.PORT;

// Express Middleware for serving static
// files and parsing the request body
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// configure routes
const channelRoutes = require('./app/routes/channelRoutes');
app.use('/', channelRoutes);

// Start the Server
http.listen(port, function() {
    console.log('Server Started. Listening on *:' + port);
});

// store list of all channels
let channels = [];
// Store people in chatroom
let chatters = [];
// Store messages in chatroom
let chat_messages = [];


// Redis Client Ready
redis.once('ready', function() {
    console.log("connected to redis server!")
    // Flush Redis DB. Not to be used until migrations are required
    // client.flushdb();

    // Initialize chat rooms
    redis.get('chat_rooms', function(err, reply) {
        if(reply) {
            chat_rooms = JSON.parse(reply);
        }
    });
    // Initialize Chatters
    redis.get('chat_users', function(err, reply) {
        if (reply) {
            chatters = JSON.parse(reply);
        }
    });
    // Initialize Messages
    redis.get('chat_app_messages', function(err, reply) {
        if (reply) {
            chat_messages = JSON.parse(reply);
        }
    });
});