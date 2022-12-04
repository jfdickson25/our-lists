const express = require('express')
const app = express()
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, 'public')))
    .use(cors())
    .use('/', routes);

    mongoose.connect(
        MONGODB_URL, options
    )
    .then(result => {

        io.on('connection', (socket) => {
            socket.on('add-item', (item) => {
                socket.broadcast.emit('add-item', item);
            });

            socket.on('remove-item', (item) => {
                socket.broadcast.emit('remove-item', item);
            });

            socket.on('add-category', category => {
                socket.broadcast.emit('add-category', category);
            });

            socket.on('remove-category', category => {
                socket.broadcast.emit('remove-category', category);
            });

            socket.on('move-down', category => {
                socket.broadcast.emit('move-down', category);
            });

            socket.on('move-up', category => {
                socket.broadcast.emit('move-up', category);
            });

            socket.on('delete-list', () => {
                socket.broadcast.emit('delete-list');
            });

            socket.on('cross-off-item', item => {
                socket.broadcast.emit('cross-off-item', item);
            });

            socket.on('un-cross-off', item => {
                socket.broadcast.emit('un-cross-off', item);
            });

            socket.on('decrement', item => {
                socket.broadcast.emit('decrement', item);
            });

            socket.on('increment', item => {
                socket.broadcast.emit('increment', item);
            });
    
            socket.on('error', function (err) { 
                console.log("Socket.IO Error"); 
                console.log(err.stack); // this is changed from your code in last comment
             });
        });
        
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
