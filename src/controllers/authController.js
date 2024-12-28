const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const login = (req, res) => {
    const { username, password } = req.body;

    console.log(1121, req, res);
    userModel.findUserByUsername(username, async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: `User ${username} does not exist` });
        }

        const user = results[0];
        const isPasswordValid = password === user.password; // Replace with bcrypt for production

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        return res.json({ message: 'Login successful', user: user });
    });
};

module.exports = {
    login,
};
