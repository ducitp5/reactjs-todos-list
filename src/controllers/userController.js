const userModel = require('../models/userModel');

const getUsers = (req, res) => {
    userModel.getAllUsers(
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        }
    );
};

module.exports = {
    getUsers,
};
