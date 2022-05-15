const mysql = require('mysql2')
const fs = require('fs');
const fastcsv = require('fast-csv');
import { database_conf } from './database_conf';

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
                let first_row_as_string = data.map(i => "`" + i + "`" + " varchar(255)").join(",")
                db.query(`CREATE TABLE IF NOT EXISTS ${name} (${first_row_as_string});`, (error: any, results: any) => { if (error) { console.error(error); } });
            }
            else {
                let query = `INSERT INTO ${name} (${header_row.map(i=>  "`" + i + "`" ).toString()}) VALUES (${data.map(i => `"${i}"`).toString()})`;
                db.query(query, (error: any, results: any) => { if (error) { console.error(error); } });                
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
