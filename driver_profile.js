"use strict";
exports.__esModule = true;
exports.driver_profile = void 0;
var mysql = require('mysql2');
var database_conf = require('./database_conf').database_conf;
/**
 * Get a specific driver by id with all of his races sorted by date from newest to the oldest with:
 * Average lap time, Fastest lap time, Slowest lap time, Number of pit stops, Fastest pit stop, Slowest pit stop, Circuit name, Points, Position
 *
 * @param db the database connection
 * @param {string} driverId the driver id to get the
 * @param {function} callback the callback function to call when the query is done
 */
function driver_profile(db, driverId, callback) {
    /*let query = `select results.raceid, avg(lap_times.milliseconds) as 'average_lap_time',
    min(lap_times.milliseconds) as 'fastest_lap_time',
    max(lap_times.milliseconds) as 'slowest_lap_time',
    sum(pit_stops.\`stop\`) as 'number_of_pit_stops',
    min(pit_stops.milliseconds) as 'fastest_pit_stop',
    max(pit_stops.milliseconds) as 'slowest_pit_stop',
    circuits.\`name\` as 'circuit_name',
    sum(results.points), results.position
    from results, races, lap_times, pit_stops, circuits
    where races.raceid = results.raceid and results.driverid = ${driverId}
    and lap_times.raceId = races.raceid and lap_times.driverId = results.driverid
    and pit_stops.raceId = races.raceid and pit_stops.driverId = results.driverid
    and circuits.circuitid = races.circuitid
    group by results.raceid
    order by races.\`date\` DESC`;
    */
    var query = "select races.raceid, \n   avg(lap_times.milliseconds) as average_lap_time, \n   min(lap_times.milliseconds) as fastest_lap_time,\n   max(lap_times.milliseconds) as slowest_lap_time,\n   count(lap_times.milliseconds) as total_pit_stops, \n   min(pit_stops.milliseconds) as fastest_pit_stop,\n   max(pit_stops.milliseconds) as slowest_pit_stop,\n   circuits.`name` as circuit_name,\n   driver_standings.points as points,\n   driver_standings.position as position\n   from drivers\n   join driver_standings\n   on drivers.driverid = driver_standings.driverid\n   join races\n   and driver_standings.raceid = races.raceid\n   join circuits\n   on races.cercuitid = circuits.cercuitid\n   join lap_times\n   on races.raceid = lap_times.raceid\n   and lap_times.driverid = drivers.driverid\n   join pit_stops\n   on lap_times.raceid = lap_times.raceid\n   and pit_stops.driverid = drivers.driverid\n   where drivers.driverid = ".concat(driverId, "\n   group by races.raceid, drivers.driverid\n   order by races.`date` desc");
    db.query(query, function (error, results) {
        if (error) {
            console.error(error);
        }
        else {
            callback(results);
        }
    });
}
exports.driver_profile = driver_profile;
