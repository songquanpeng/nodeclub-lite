const express = require('express');
const auth = require('../middlewares/web_auth');
const site = require('../controllers/site');
const sign = require('../controllers/sign');
const config = require('../config');
const router = express.Router();

router.get('/', site.index);

router.get('/setting', auth.userRequired);

// sign controller
if (config.allow_sign_up) {
  router.get('/signup', sign.showSignUp);
  router.post('/signup', sign.signUp);
}

router.get('/signin', sign.showSignIn);
router.post('/signin', sign.signIn);

module.exports = router;
