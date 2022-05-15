import {Connection} from 'mysql2';

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