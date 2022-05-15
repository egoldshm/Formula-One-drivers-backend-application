import {Connection} from 'mysql2';

/**
 * Get query run on the database and handle with callback 
 * @param {Connection} db the database connection
 * @param {string} query the query to send to the database
 * @param {Function} callback the callback function to call when the query is done
 */
function send_query_to_db(db: Connection, query: string, callback: Function) {
    db.query(query, (error: any, results: string[]) => {
        if (error) {
            console.error(error);
        } else {
            callback(results);
        }
    });
}
export { send_query_to_db };