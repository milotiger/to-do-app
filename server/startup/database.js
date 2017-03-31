let mongoose = require('mongoose');
// Config Mongoose
//-----------------------------------------------
mongoose.Promise = global.Promise;

// Open a connection to the database
//-----------------------------------------------
mongoose.connect('mongodb://139.59.230.231:27017/todo');

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to database`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

// Close connection
//-----------------------------------------------
let mongoShutdown = function(message, callback) {
    mongoose.connection.close(function() {
        console.log(`Mongoose disconnected through ${message}`);
        callback();
    });
};

// App termination
process.once('SIGINT', () => {
    mongoShutdown('app termination', () => {
        process.exit(0);
    });
});

// Heroku termination
process.once('SIGTERM', () => {
    mongoShutdown('app termination', () => {
        process.exit(0);
    });
});

// Database models
//-----------------------------------------------
require('../models/item');
require('../models/category');
