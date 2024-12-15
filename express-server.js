const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const expressServer = express();
const port = 5000;

const cors = require('cors');

// Enable CORS for all origins
expressServer.use(cors());

// expressServer.use(cors({
//     origin: 'http://localhost:3000',
// }));

const bcrypt = require('bcrypt'); // Use bcrypt for password hashing
const bodyParser = require('body-parser');
expressServer.use(bodyParser.json()); // Parse JSON request bodies

// Create a connection to the MySQL database
const mySqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// mySqlConnection.connect((err) => {
//     if (err) {
//         console.error('MySQL connection failed:', err);
//     } else {
//         console.log('MySQL connection successful');
//     }
// });


expressServer.post(
    '/api/login',
    (req, res) => {

        const { username, password } = req.body;

        // Query the database for the user
        const query = 'SELECT * FROM users WHERE user_name = ?';

        mySqlConnection.query(
            query,
            [username],
            async (err, results) => {

                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                console.log(2233, results, req, res, expressServer);

                if (results.length === 0) {
                    return res.status(401).json({ error: 'user name ' +username +' dont exist' });
                }

                const user = results[0];

                // Compare the hashed password
                // const isPasswordValid = await bcrypt.compare(password, user.password);
                const isPasswordValid = (password == user.password) ? true : false;

                if (!isPasswordValid) {
                    return res.status(401).json({ error: 'Invalid credentials 33' });
                }

                // Success: Return user info (avoid sending sensitive data)
                return res.json({ message: 'Login successful', user: { id: user.id, name: user.name } });
            }
        );
    }
);

// API route to fetch data
expressServer.get('/api/users', (req, res) => {
    mySqlConnection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Start the server
expressServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
