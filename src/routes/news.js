var express = require('express');

var router = express.Router();

const newsController = require('../controllers/NewsController');

router.use('/', (req, res) => newsController.index(req, res, router));
router.post('/edit', newsController.edit);

module.exports = router;