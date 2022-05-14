/**
 * Get a specific driver by id with all of his races sorted by date from newest to the oldest with:
 * Average lap time, Fastest lap time, Slowest lap time, Number of pit stops, Fastest pit stop, Slowest pit stop, Circuit name, Points, Position
 * 
 * @param db the database connection
 * @param {string} driverId the driver id to get
 * @param {function} callback the callback function to call when the query is done
 */
 function driver_profile_by_id(db: any, driverId:string, callback: Function)
 {
    let query = `select results.raceid, avg(lap_times.milliseconds) as 'average_lap_time',
    min(lap_times.milliseconds) as 'fastest_lap_time',
    max(lap_times.milliseconds) as 'slowest_lap_time',
    sum(pit_stops.\`stop\`) as 'number_of_pit_stops',
    min(pit_stops.milliseconds) as 'fastest_pit_stop',
    max(pit_stops.milliseconds) as 'slowest_pit_stop',
    circuits.\`name\` as 'circuit_name',
    sum(results.points) as sum_points, results.position
    from results, races, lap_times, pit_stops, circuits
    where races.raceid = results.raceid and results.driverid = ${driverId}
    and lap_times.raceId = races.raceid and lap_times.driverId = results.driverid
    and pit_stops.raceId = races.raceid and pit_stops.driverId = results.driverid
    and circuits.circuitid = races.circuitid
    group by results.raceid
    order by races.\`date\` DESC`;
   
    db.query(query, (error: any, results: any) => {
        if (error) {
            console.error(error);
        } else {
            callback(results);
        }
    });
      
 }
 
 /**
  * Get a specific driver by id with all of his races sorted by date from newest to the oldest with:
  * Average lap time, Fastest lap time, Slowest lap time, Number of pit stops, Fastest pit stop, Slowest pit stop, Circuit name, Points, Position
  * 
  * @param db the database connection
  * @param {string} driverName the driver's name to get the
  * @param {function} callback the callback function to call when the query is done
  */
  function driver_profile_by_name(db: any, driverName:string, callback: Function)
  {
     let query = `select results.raceid, avg(lap_times.milliseconds) as 'average_lap_time',
     min(lap_times.milliseconds) as 'fastest_lap_time',
     max(lap_times.milliseconds) as 'slowest_lap_time',
     sum(pit_stops.\`stop\`) as 'number_of_pit_stops',
     min(pit_stops.milliseconds) as 'fastest_pit_stop',
     max(pit_stops.milliseconds) as 'slowest_pit_stop',
     circuits.\`name\` as 'circuit_name',
     sum(results.points) as sum_points, results.position
     from results, races, lap_times, pit_stops, circuits, drivers
     where races.raceid = results.raceid and 
     (CONCAT(drivers.forename, ' ', drivers.surname) = '${driverName}' and results.driverid = drivers.driverid)
     and lap_times.raceId = races.raceid and lap_times.driverId = results.driverid
     and pit_stops.raceId = races.raceid and pit_stops.driverId = results.driverid
     and circuits.circuitid = races.circuitid
     group by results.raceid
     order by races.\`date\` DESC`;
    
     db.query(query, (error: any, results: any) => {
         if (error) {
             console.error(error);
         } else {
             callback(results);
         }
     });
       
  }
 
 
export {driver_profile_by_id, driver_profile_by_name};
