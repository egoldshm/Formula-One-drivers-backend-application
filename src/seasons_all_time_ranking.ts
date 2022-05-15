import {send_query_to_db} from './send_query_to_db';
import {Connection} from 'mysql2';

const TOP_OF_THE_SEASON = 3;
/**
 * returns a list of seasons with the top 3 drivers in each season
 * @param db the database connection
 * @param {function} callback the callback function to call when the query is done
 */
 function seasons_all_times_ranking(db: Connection, callback: Function)
 {
    let query = `SELECT seasons.\`year\`,
        (
        SELECT JSON_ARRAYAGG(CONCAT(t.driver, '| ', t.driverid, '| wins: ', total_wins)) as top_drivers
        FROM (
        select drivers.driverid, CONCAT(drivers.forename, ' ', drivers.surname) as driver,
        sum(driver_standings.wins) as total_wins,
        races.\`year\` as race_year
        from drivers
        join driver_standings
        on drivers.driverid = driver_standings.driverid
        join races
        on races.raceid = driver_standings.raceid
        where races.\`year\` = seasons.\`year\`
        group by drivers.driverid
        order by sum(driver_standings.wins) desc
        limit ${TOP_OF_THE_SEASON}) t
        ) as top_drivers
    FROM seasons
    ORDER BY seasons.\`year\` DESC;`;
    send_query_to_db(db, query, callback);      
 }

export {seasons_all_times_ranking};