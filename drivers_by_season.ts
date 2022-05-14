/**
 * get drivers by season order by wins for a given season
 * @param db the database connection
 * @param {string} season  the season to get the drivers by
 * @param {function} callback the callback function to call when the query is done
 */
function drivers_by_season_order_by_points(db: any, season: string, callback: Function) {
    let query = `select drivers.* from driver_standings, races, drivers
    where races.year = '${season}' and races.raceid=driver_standings.raceid and driver_standings.driverid = drivers.driverid
    group by driver_standings.driverId
    order by sum(driver_standings.wins)`;
    db.query(query, (error: any, results: any) => {
        if (error) {
            console.error(error);
        } else {
            callback(results);
        }
    });
}

export {drivers_by_season_order_by_points};
