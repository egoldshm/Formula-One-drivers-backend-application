const database_conf = {
    host: 'localhost',
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: 'SQLOpora',
    insecureAuth: true
};

export {database_conf};