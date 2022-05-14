"use strict";
exports.__esModule = true;
exports.drivers_by_season_order_by_points = void 0;
/**
 * get drivers by season order by wins for a given season
 * @param db the database connection
 * @param {string} season  the season to get the drivers by
 * @param {function} callback the callback function to call when the query is done
 */
function drivers_by_season_order_by_points(db, season, callback) {
    var query = "select drivers.* from driver_standings, races, drivers\n    where races.year = '".concat(season, "' and races.raceid=driver_standings.raceid and driver_standings.driverid = drivers.driverid\n    group by driver_standings.driverId\n    order by sum(driver_standings.wins)");
    db.query(query, function (error, results) {
        if (error) {
            console.error(error);
        }
        else {
            callback(results);
        }
    });
}
exports.drivers_by_season_order_by_points = drivers_by_season_order_by_points;
