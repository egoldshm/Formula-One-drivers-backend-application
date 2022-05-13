const mysql = require('mysql2')
const { database_conf } = require('./database_conf');

/**
 * get drivers by season order by wins for a given season
 * @param db the database connection
 * @param {string} season  the season to get the drivers by
 * @param {function} callback the callback function to call when the query is done
 */
function drivers_by_season_order_by_points(db: any, season: string, callback: Function) {
    let query = `select drivers.* from results, races, drivers
    where races.year = ${season} and races.raceid=results.raceid and results.driverid = drivers.driverid
    group by results.driverId
    order by count(points = 10)`;
    db.query(query, (error: any, results: any) => {
        if (error) {
            console.error(error);
        } else {
            callback(results);
        }
    });
}

export {drivers_by_season_order_by_points};
