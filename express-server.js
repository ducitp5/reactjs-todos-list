const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const expressServer = express();

// Enable CORS for all origins
expressServer.use(cors());

// expressServer.use(cors({
//     origin: 'http://localhost:3000',
// }));

expressServer.use(bodyParser.json()); // Parse JSON request bodies

expressServer.use('/api/login', authRoutes);
expressServer.use('/api/users', userRoutes);

const PORT = 5000;
// Start the server
expressServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
