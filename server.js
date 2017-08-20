/*
 * Copyright (C) 2017 mibbit., All Rights Reserved.
 */

'use strict';

/**
 * Entry file for the servers
 *
 * @author      AON
 * @version     1.0.0
 */


/*----------  import libraries  ----------*/
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const redis = require('./db');
const morgan = require('morgan');
const winston = require('winston');
const http = require('http');
const io = require('socket.io');
const helmet = require('helmet');


/*----------  import custom modules  ----------*/
const config = require('./config/config');
const channelRoutes = require('./app/routes/channelRoutes');

// app instance created and passed to server instance which in turn is passed to socket instance
const app = express();
const server = http.Server(app);
const socket = io(server);

// import config and bind to the app instance


// configure server port
const port = config.PORT;

// Express Middleware for serving static

// app.use(helmet);
// files and parsing the request body
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


/*====================================
=            logger setup            =
====================================*/

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
app.use(morgan("dev", { "stream": logger.stream }));

/*=====  End of logger setup  ======*/


// configure routes
app.use('/', channelRoutes);

app.use(function(req, res) {
    res.send(404, 'not found :-(');
});

// Start the Server
server.listen(port, function() {
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