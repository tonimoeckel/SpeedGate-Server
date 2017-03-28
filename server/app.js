'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const feathers = require('feathers');
const serveStatic = require('feathers').static;
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const config = require('./config.json');
const toc = require('tick-of-clock');

var timer = toc();
var state = {
    status: -1,
    start: null,
    stop: null,
    time: null
}

var interval = null;

// Create a feathers instance.
var app = feathers()
// Enable the REST provider for services.
    .configure(rest())
    .configure(socketio(function(io) {
        io.on('connection', function(socket) {

            socket.on('join', function (data) {
                if (data == config.startEmitterId){
                    state.start = socket.id;
                }
                if (data == config.stopEmitterId){
                    state.stop = socket.id;
                }
                console.log(state);
                socket.emit('connect', state);
            });

            socket.on('ready', function (data) {
                state.status = 0;
                state.time = 0;
                console.log('Timer ready');
                socket.broadcast.emit('state',state);
                socket.emit('state',state);
                if (interval){
                    clearInterval(interval);
                }

            });

            socket.on('emit',function(data){
                data = parseInt(data);
                if (state.status === 0 && socket.id === state.start && data === 0){
                    if (interval){
                        clearInterval(interval);
                    }
                    state.status = 1;
                    timer.reset();
                    timer.start();
                    console.log('Started Timer');
                    interval = setInterval(function(){
                        state.time = timer.getTime();
                        socket.broadcast.emit('state',state);
                    },100);

                }else if (state.status === 1 && socket.id === state.stop && data === 0){
                    state.status = -1;
                    state.time = timer.getTime();
                    timer.stop();
                    console.log('Stopped Timer',state.time);
                    if (interval){
                        clearInterval(interval);
                    }
                    socket.broadcast.emit('state',state);
                }

            });

        });


    }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}));


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });


module.exports = app;