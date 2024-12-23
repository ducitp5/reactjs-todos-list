var express = require('express');

var router = express.Router();

const newsController = require('../controllers/NewsController');

router.use('/:slug', newsController.show);
router.use('/', (req, res) => newsController.index(req, res, router));

module.exports = router;