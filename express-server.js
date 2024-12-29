const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const expressServer = express();

// Enable CORS for all origins
expressServer.use(cors());

// expressServer.use(cors({
//     origin: 'http://localhost:3000',
// }));

expressServer.use(bodyParser.json()); // Parse JSON request bodies


const db = require('./src/config/db');
const route = require('./src/routes')
route(expressServer);

expressServer.get('/api/query-users', (req, res) => {

    const { username, email } = req.query;

    console.log(req.query)
    let sqlQuery = 'SELECT * FROM users WHERE 1=1'; // Base query
    const queryParams = [];

    if (username) {
        sqlQuery += ' AND name LIKE ?';
        queryParams.push(`%${username}%`); // Partial match for username
    }

    if (email) {
        sqlQuery += ' AND email LIKE ?';
        queryParams.push(`%${email}%`); // Partial match for email
    }

    db.query(sqlQuery, queryParams, (err, results) => {
        if (err) {
            console.log('Error querying users:', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        console.log('resss - ', results, 66, sqlQuery, 77, queryParams);
        res.json(results);
    });

expressServer.get('/sendFile', (req, res) => {
    res.sendFile(__dirname + '/src/views/layouts/index.html');
});

const PORT = 5000;
// Start the server
expressServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
