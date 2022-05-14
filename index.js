"use strict";
exports.__esModule = true;
var driver_profile_1 = require("./driver_profile");
var express = require('express');
var drivers_by_season_order_by_points = require('./drivers_by_season').drivers_by_season_order_by_points;
var seasons_all_times_ranking = require('./seasons_all_time_ranking').seasons_all_times_ranking;
var database_conf = require('./database_conf').database_conf;
var mysql = require('mysql2');
var db = mysql.createConnection(database_conf);
var server = express();
var port = process.env.PORT || 3000;
var welcome_message = "hello! this your options:\n<br> 1. /DriversBySeason/:seasons for getting the drivers by season order by wins\n<br>2. <a href=\"/SeasonsAllTimesRanking\">/SeasonsAllTimesRanking</a>  for getting the top 3 drivers in each season\n<br>3. /DriverProfile/:driver_id for getting the driver profile by driver id with all of his races sorted by date\n";
server.get('/', function (req, res) {
    res.send(welcome_message);
});
server.get('/DriversBySeason/:seasons', function (req, res) {
    drivers_by_season_order_by_points(db, req.params.seasons, function (results) {
        res.status(200).json(results);
    });
});
server.get('/SeasonsAllTimesRanking', function (req, res) {
    seasons_all_times_ranking(db, function (results) {
        res.status(200).json(results);
    });
});
server.get('/driverProfile/:driver', function (req, res) {
    if (isNaN(req.params.driver)) {
        (0, driver_profile_1.driver_profile_by_name)(db, req.params.driver, function (results) {
            res.status(200).json(results);
        });
    }
    else {
        (0, driver_profile_1.driver_profile_by_id)(db, req.params.driver, function (results) {
            res.status(200).json(results);
        });
    }
});
server.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
