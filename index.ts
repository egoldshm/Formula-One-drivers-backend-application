const express = require('express');
const {drivers_by_season_order_by_points} = require('./drivers_by_season');
const {driver_profile} = require('./driver_profile');

const { database_conf } = require('./database_conf');
const mysql = require('mysql2')

const db = mysql.createConnection(database_conf)

const server = express();

const port = process.env.PORT || 3000;

server.get('/', (req, res) => {
    res.send(`hello! this your options:
1. /DriversBySeason/:seasons
2. 
3. /DriverProfile/:driver_id
`);
});

server.get('/DriversBySeason/:seasons', (req, res) => {
    // send a response of type json with a status code of 200
    drivers_by_season_order_by_points(db, req.params.seasons, (results) => {
        res.status(200).json(results);
    });
});

server.get('/driverProfile/:driver', (req, res) => {
    // send a response of type json with a status code of 200
    driver_profile(db, req.params.driver, (results) => {
        res.status(200).json(results);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);

export {};
