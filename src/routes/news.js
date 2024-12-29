var express = require('express');

var router = express.Router();

const newsController = require('../controllers/NewsController');

router.get('/sendFile', newsController.sendFile);
router.post('/edit', newsController.edit);
router.use('/', (req, res) => newsController.index(req, res, router));

module.exports = router;