const mysql = require('mysql2')
const { database_conf } = require('./database_conf');
const TOP_OF_THE_SEASON = 3;
/**
 * returns a list of seasons with the top 3 drivers in each season
 * @param db the database connection
 * @param {function} callback the callback function to call when the query is done
 */
 function seasons_all_times_ranking(db: any, callback: Function)
 {
    let query = `select top ${TOP_OF_THE_SEASON} drivers.* from results, races, drivers
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

export {seasons_all_times_ranking};
