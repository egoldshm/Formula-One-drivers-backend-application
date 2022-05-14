import { driver_profile_by_id ,driver_profile_by_name } from "./src/driver_profile";
import { drivers_by_season_order_by_points } from './src/drivers_by_season';
import { seasons_all_times_ranking } from './src/seasons_all_time_ranking';
import { database_conf } from './src/database_conf';
const mysql = require('mysql2')
const express = require('express');

const db = mysql.createConnection(database_conf)

const server = express();

const port = process.env.PORT || 3000;

const welcome_message = `<div style="font-family: monospace;"> <h1> hello! this your options: </h1>
1.<a href="/DriversBySeason/1980">/DriversBySeason/:seasons</a> for getting the drivers by season order by wins
<br>2.<a href="/SeasonsAllTimesRanking">/SeasonsAllTimesRanking</a> for getting the top 3 drivers in each season
<br>3.<a href="/DriverProfile/3">/DriverProfile/:driver_id</a> for getting the driver profile by driver id with all of his races sorted by date
</div>
`;

server.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send(welcome_message);
});

server.get('/DriversBySeason/:seasons', (req: { params: { seasons: string; }; }, res: any) => {
    drivers_by_season_order_by_points(db, req.params.seasons, (results: any) => {
        res.status(200).json(results);
    });
});

server.get('/SeasonsAllTimesRanking', (req: any, res: any) => {
    seasons_all_times_ranking(db, (results: any) => {
        res.status(200).json(results);
    });
});

server.get('/driverProfile/:driver', (req: { params: { driver: string; }; },
    res: any) => {
    if(req.params.driver.includes(' ')){
        driver_profile_by_name(db, req.params.driver, (results: any) => {
            res.status(200).json(results);
        });
    }
    else {
        driver_profile_by_id(db, req.params.driver, (results: any) => {
            res.status(200).json(results);
        });
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);

export { };
