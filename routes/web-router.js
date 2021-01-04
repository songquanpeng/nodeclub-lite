const express = require('express');
const auth = require('../middlewares/web_auth');
const router = express.Router();

const site = require('../controllers/site');

router.get('/', site.index);

router.get('/setting', auth.userRequired);

module.exports = router;
