let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// Config models
//-------------------------------------------------
require('./database');

// Config standard middlewares
//-------------------------------------------------
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Config routes
//-------------------------------------------------
app.use('/api', require('../apis/router'));

// Serve client files
//-------------------------------------------------
app.use(express.static('public'));

// For route with AngularJs route
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// Exports
//-------------------------------------------------
module.exports = app;