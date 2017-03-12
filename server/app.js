'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const feathers = require('feathers');
const serveStatic = require('feathers').static;
const rest = require('feathers-rest');
const bodyParser = require('body-parser');

// Create a feathers instance.
var app = feathers()
// Enable the REST provider for services.
    .configure(rest())
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