var mysql = require('mysql2');
var fs = require('fs');
var fastcsv = require('fast-csv');
/*
const db = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'Z9YEvj12OH',
    password: 'RSJ4zKsVqS',
    database: 'Z9YEvj12OH'
})*/
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SQL_Opora123',
    database: 'SQLOpora',
    insecureAuth: true
});
function UploadCsvDataToMySQL(filePath) {
    var name = filePath.split('.')[0];
    var stream = fs.createReadStream('./csv/' + filePath);
    var header_row = [];
    var first_row = true;
    var csvStream = fastcsv.parse()
        .on("data", function (data) {
        if (first_row) {
            first_row = false;
            header_row = data;
            var first_row_as_string = data.map(function (i) { return "`" + i + "`" + " varchar(255)"; }).join(",");
            console.log(name);
            db.query("CREATE TABLE IF NOT EXISTS ".concat(name, " (").concat(first_row_as_string, ");"), function (error, results) { if (error) {
                console.error(error);
            } });
        }
        else {
            var query = "INSERT INTO ".concat(name, " (").concat(header_row.map(function (i) { return "`" + i + "`"; }).toString(), ") VALUES (").concat(data.map(function (i) { return "\"".concat(i, "\""); }).toString(), ")");
            db.query(query, function (error, results) { if (error) {
                console.error(error);
            } });
        }
    }).
        on("end", function () {
        console.log("done " + name + " 1");
    }, function (error) { console.log(error); });
    stream.pipe(csvStream);
    // close the stream after finish
    stream.on("end", function () {
        console.log("done" + name + "2");
    }, function (error) { console.log(error); });
}
fs.readdir('./csv', function (err, files) {
    if (err) {
        console.error(err);
    }
    else {
        files.forEach(function (file) {
            var name = file.split('.')[0];
            UploadCsvDataToMySQL(file);
        });
    }
});
