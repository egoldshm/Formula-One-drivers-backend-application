"use strict";
exports.__esModule = true;
exports.driver_profile_by_name = exports.driver_profile_by_id = void 0;
/**
 * Get a specific driver by id with all of his races sorted by date from newest to the oldest with:
 * Average lap time, Fastest lap time, Slowest lap time, Number of pit stops, Fastest pit stop, Slowest pit stop, Circuit name, Points, Position
 *
 * @param db the database connection
 * @param {string} driverId the driver id to get
 * @param {function} callback the callback function to call when the query is done
 */
function driver_profile_by_id(db, driverId, callback) {
    var query = "select results.raceid, avg(lap_times.milliseconds) as 'average_lap_time',\n    min(lap_times.milliseconds) as 'fastest_lap_time',\n    max(lap_times.milliseconds) as 'slowest_lap_time',\n    sum(pit_stops.`stop`) as 'number_of_pit_stops',\n    min(pit_stops.milliseconds) as 'fastest_pit_stop',\n    max(pit_stops.milliseconds) as 'slowest_pit_stop',\n    circuits.`name` as 'circuit_name',\n    sum(results.points) as sum_points, results.position\n    from results, races, lap_times, pit_stops, circuits\n    where races.raceid = results.raceid and results.driverid = ".concat(driverId, "\n    and lap_times.raceId = races.raceid and lap_times.driverId = results.driverid\n    and pit_stops.raceId = races.raceid and pit_stops.driverId = results.driverid\n    and circuits.circuitid = races.circuitid\n    group by results.raceid\n    order by races.`date` DESC");
    db.query(query, function (error, results) {
        if (error) {
            console.error(error);
        }
        else {
            callback(results);
        }
    });
}
exports.driver_profile_by_id = driver_profile_by_id;
/**
 * Get a specific driver by id with all of his races sorted by date from newest to the oldest with:
 * Average lap time, Fastest lap time, Slowest lap time, Number of pit stops, Fastest pit stop, Slowest pit stop, Circuit name, Points, Position
 *
 * @param db the database connection
 * @param {string} driverName the driver's name to get the
 * @param {function} callback the callback function to call when the query is done
 */
function driver_profile_by_name(db, driverName, callback) {
    var query = "select results.raceid, avg(lap_times.milliseconds) as 'average_lap_time',\n     min(lap_times.milliseconds) as 'fastest_lap_time',\n     max(lap_times.milliseconds) as 'slowest_lap_time',\n     sum(pit_stops.`stop`) as 'number_of_pit_stops',\n     min(pit_stops.milliseconds) as 'fastest_pit_stop',\n     max(pit_stops.milliseconds) as 'slowest_pit_stop',\n     circuits.`name` as 'circuit_name',\n     sum(results.points) as sum_points, results.position\n     from results, races, lap_times, pit_stops, circuits, drivers\n     where races.raceid = results.raceid and \n     (CONCAT(drivers.forename, ' ', drivers.surname) = '".concat(driverName, "' and results.driverid = drivers.driverid)\n     and lap_times.raceId = races.raceid and lap_times.driverId = results.driverid\n     and pit_stops.raceId = races.raceid and pit_stops.driverId = results.driverid\n     and circuits.circuitid = races.circuitid\n     group by results.raceid\n     order by races.`date` DESC");
    db.query(query, function (error, results) {
        if (error) {
            console.error(error);
        }
        else {
            callback(results);
        }
    });
}
exports.driver_profile_by_name = driver_profile_by_name;
