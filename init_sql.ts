const mysql = require('mysql2')
const fs = require('fs');
const fastcsv = require('fast-csv');
import { database_conf } from './src/database_conf';
import { send_query_to_db } from './src/send_query_to_db';

const db = mysql.createConnection(database_conf)

/**
* @param {string} filePath the file path of csv file to upload to database
*/
function UploadCsvDataToMySQL(filePath: string) {
    const name = filePath.split('.')[0] // name of the table
    let stream = fs.createReadStream('./csv/' + filePath)
    let header_row: string[] = [];
    let first_row: boolean = true;
    let csvStream = fastcsv.parse()
        .on("data", function (data: string[]) {
            if (first_row) {
                first_row = false;
                header_row = data;
                const first_row_as_string = data.map(i => "`" + i + "`" + " varchar(255)").join(",")
                send_query_to_db(db, `CREATE TABLE IF NOT EXISTS ${name} (${first_row_as_string});`, (results: any) => { });
            }
            else {
                const query = `INSERT INTO ${name} (${header_row.map(i=>  "`" + i + "`" ).toString()}) VALUES (${data.map(i => `"${i}"`).toString()})`;
                send_query_to_db(db, query, (results: any) => { });

            }

        });
    stream.pipe(csvStream);
    }

// read all files in the csv folder and upload to database
fs.readdir('./csv', (err: any, files: string[]) => {
    if (err) {
        console.error(err);
    } else {
        files.forEach((file: string) => {
            UploadCsvDataToMySQL(file)
        }
        );
    }
});

export {};
