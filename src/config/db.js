const mysql = require('mysql2');
require('dotenv').config();

const mySqlConnection = mysql.createConnection({
    host:       'localhost', //process.env.DB_HOST,
    user:       'root', // process.env.DB_USER,
    password:   '', // process.env.DB_PASSWORD,
    database:   'react_todo_list', // process.env.DB_NAME,
    port:       '3306', // process.env.DB_PORT,
});

mySqlConnection.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
    } else {
        console.log('MySQL connection successful');
    }
});

module.exports = mySqlConnection;
