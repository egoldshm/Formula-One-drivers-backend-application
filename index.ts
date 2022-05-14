import { driver_profile_by_id ,driver_profile_by_name } from "./driver_profile";

const express = require('express');
const { drivers_by_season_order_by_points } = require('./drivers_by_season');
const { seasons_all_times_ranking } = require('./seasons_all_time_ranking');
const { database_conf } = require('./database_conf');
const mysql = require('mysql2')

const db = mysql.createConnection(database_conf)

const server = express();

const port = process.env.PORT || 3000;

const welcome_message = `hello! this your options:
<br> 1. /DriversBySeason/:seasons for getting the drivers by season order by wins
<br>2. <a href="/SeasonsAllTimesRanking">/SeasonsAllTimesRanking</a>  for getting the top 3 drivers in each season
<br>3. /DriverProfile/:driver_id for getting the driver profile by driver id with all of his races sorted by date
`;

server.get('/', (req, res) => {
    res.send(welcome_message);
});

server.get('/DriversBySeason/:seasons', (req, res) => {
    drivers_by_season_order_by_points(db, req.params.seasons, (results) => {
        res.status(200).json(results);
    });
});

server.get('/SeasonsAllTimesRanking', (req, res) => {
    seasons_all_times_ranking(db, (results) => {
        res.status(200).json(results);
    });
});

server.get('/driverProfile/:driver', (req, res) => {
    if (isNaN(req.params.driver)) {
        driver_profile_by_name(db, req.params.driver, (results) => {
            res.status(200).json(results);
        });
    }
    else {
        driver_profile_by_id(db, req.params.driver, (results) => {
            res.status(200).json(results);
        });
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);

export { };
