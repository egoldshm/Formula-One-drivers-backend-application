"use strict";
exports.__esModule = true;
exports.seasons_all_times_ranking = void 0;
var TOP_OF_THE_SEASON = 3;
/**
 * returns a list of seasons with the top 3 drivers in each season
 * @param db the database connection
 * @param {function} callback the callback function to call when the query is done
 */
function seasons_all_times_ranking(db, callback) {
    var query = "SELECT seasons.`year`,\n        (\n        SELECT JSON_ARRAYAGG(CONCAT(t.driver, '| ', t.driverid, '| wins: ', total_wins)) as top_drivers\n        FROM (\n        select drivers.driverid, CONCAT(drivers.forename, ' ', drivers.surname) as driver,\n        sum(driver_standings.wins) as total_wins,\n        races.`year` as race_year\n        from drivers\n        join driver_standings\n        on drivers.driverid = driver_standings.driverid\n        join races\n        on races.raceid = driver_standings.raceid\n        where races.`year` = seasons.`year`\n        group by drivers.driverid\n        order by sum(driver_standings.wins) desc\n        limit ".concat(TOP_OF_THE_SEASON, ") t\n        ) as top_drivers\n    FROM seasons\n    ORDER BY seasons.`year` DESC;");
    db.query(query, function (error, results) {
        if (error) {
            console.error(error);
        }
        else {
            callback(results);
        }
    });
}
exports.seasons_all_times_ranking = seasons_all_times_ranking;
