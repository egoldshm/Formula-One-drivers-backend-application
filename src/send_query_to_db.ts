function send_query_to_db(db: any, query: string, callback: Function) {
    db.query(query, (error: any, results: any) => {
        if (error) {
            console.error(error);
        } else {
            callback(results);
        }
    });
}
export { send_query_to_db };