const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 5000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
    } else {
        console.log('MySQL connection successful');
    }
});
// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

// Create table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

console.log('createTableQuery - ', createTableQuery)

db.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log('Users table ready');
});

// Seed data
const seedDataQuery = `
  INSERT IGNORE INTO users (name, email) VALUES
  ('John Doe', 'john.doe@example.com'),
  ('Jane Smith', 'jane.smith@example.com');
`;

db.query(seedDataQuery, (err) => {
    if (err) throw err;
    console.log('Seed data inserted');
});

// API route to fetch data
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
