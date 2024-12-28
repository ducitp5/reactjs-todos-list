const db = require('../config/db');

const findUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE user_name = ?';
    db.query(query, [username], callback);
};

const getAllUsers = (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
};

module.exports = {
    findUserByUsername,
    getAllUsers,
};
