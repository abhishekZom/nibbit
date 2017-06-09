// this is the entry file to the chat server in nodeJS

// import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const redis = require('redis');

// app instance created and passed to server instance which in turn is passed to socket instance
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 8080;

// import custom modules
const channelRoutes = require('/app/routes/channelRoutes');

// Express Middleware for serving static
// files and parsing the request body
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// use custom modules
app.use(channelRoutes);

// Start the Server
http.listen(port, function() {
    console.log('Server Started. Listening on *:' + port);
});

// Store people in chatroom
let chatters = [];
// Store messages in chatroom
let chat_messages = [];

// Read credentials from JSON, create a redis client and get a chat_rooms, chat_users and chat_app_messages
fs.readFile('creds.json', 'utf-8', function(err, data) {
    if(err) throw err;
    creds = JSON.parse(data);
    client = redis.createClient('redis://' + creds.user + ':' + creds.password + '@' + creds.host + ':' + creds.port);
    // Redis Client Ready
    client.once('ready', function() {
        // Flush Redis DB. Not to be used until migrations are required
        // client.flushdb();
        
        // Initialize chat rooms
        client.get('chat_rooms', function(err, reply) {
            if(reply) {
                chat_rooms = JSON.parse(reply);
            }
        });
        // Initialize Chatters
        client.get('chat_users', function(err, reply) {
            if (reply) {
                chatters = JSON.parse(reply);
            }
        });
        // Initialize Messages
        client.get('chat_app_messages', function(err, reply) {
            if (reply) {
                chat_messages = JSON.parse(reply);
            }
        });
    });
});
