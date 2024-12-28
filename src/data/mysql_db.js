// Create a connection to the MySQL database
const mysql = require('mysql2');

const mySqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: '',
    database: 'react_todo_list',
    port: '3306',
});

module.exports = { mySqlConnection };

mySqlConnection.connect(
    (err) => {
        if (err) {
            console.error('MySQL connection failed:', err);
        } else {
            console.log('MySQL connection successful');
        }
    }
);

// Create table if it doesn't exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) DEFAULT NULL,
        user_name VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) DEFAULT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
`;

mySqlConnection.query(
    createTableQuery,
    (err) => {
        if (err) throw err;
        console.log('Users table ready');
    }
);

const seedDataQuery = `
    INSERT IGNORE INTO users (name, user_name, password, email) VALUES
  ('Duc Tran', 'admin', '11', 'admin@example.com'),
  ('John Doe', 'john_doe', '11', 'john.doe@example.com'),
  ('Jane Smith', 'jane_smith', '11', 'jane.smith@example.com');
`;

mySqlConnection.query(
    seedDataQuery,
    (err) => {
        if (err) throw err;
        console.log('Seed data inserted');
    }
);