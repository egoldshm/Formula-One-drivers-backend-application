"use strict";
exports.__esModule = true;
var express = require('express');
var drivers_by_season_order_by_points = require('./drivers_by_season').drivers_by_season_order_by_points;
var driver_profile = require('./driver_profile').driver_profile;
var database_conf = require('./database_conf').database_conf;
var mysql = require('mysql2');
var db = mysql.createConnection(database_conf);
var server = express();
var port = process.env.PORT || 3000;
server.get('/', function (req, res) {
    res.send('Hello World!');
});
server.get('/DriversBySeason/:seasons', function (req, res) {
    // send a response of type json with a status code of 200
    drivers_by_season_order_by_points(db, req.params.seasons, function (results) {
        res.status(200).json(results);
    });
});
server.get('/driverProfile/:driver', function (req, res) {
    // send a response of type json with a status code of 200
    driver_profile(db, req.params.driver, function (results) {
        res.status(200).json(results);
    });
});
server.get('/api/courses/:id', function (req, res) {
    res.send(req.params.id);
});
server.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
