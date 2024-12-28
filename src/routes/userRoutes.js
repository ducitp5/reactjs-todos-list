const express = require('express');
const userController = require('../controllers/userController');
const { listRoutes } = require('../help/routeUtils'); // Import the utility function
const router = express.Router();

router.get('/q', (req, res) => {
    res.json('hello')
});
router.get('/route', (req, res) => {
    const routes = listRoutes(req.app); // Use req.app to get the main Express app
    res.json(routes);
});
router.get('/', userController.getUsers);

module.exports = router;
