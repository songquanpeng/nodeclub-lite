const express = require('express');
const router = express.Router();

const site = require('../controllers/site');

router.get('/', site.index);

module.exports = router;
