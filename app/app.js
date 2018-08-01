var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

global.web3 = web3;

/**
 * Middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Routers
 */
var router = require('./router');
app.use('/', router);

/**
 * Initialize server
 */
app.listen(config.server.port, function () {
    console.log('Server is listening on port ' + config.server.port);
});

module.exports = function (deployer) {}