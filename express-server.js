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

const route = require('./src/routes')
route(expressServer);

expressServer.get('/sendFile', (req, res) => {
    res.sendFile(__dirname + '/src/views/layouts/index.html');
});

const PORT = 5000;

expressServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});