const validator = require('validator');
const User = require('../proxy').User;
const config = require('../config');

function showSignUp(req, res, next) {
  res.render('sign_up', { message: '' });
}

function showSignIn(req, res, next) {
  res.render('sign_in', { message: '' });
}

async function signUp(req, res, next) {
  let username = req.body.username || '';
  username = validator.escape(username.trim().toLowerCase());
  let password = req.body.password || '';
  password = validator.escape(password.trim());
  let password2 = req.body.password2 || '';
  password2 = validator.escape(password2.trim());
  if (password !== password2) {
    return res.render('sign_up', { message: '两次输入的密码不一致' });
  }
  if (!username || !password) {
    return res.render('sign_up', { message: '信息不完整' });
  }
  if (username.length > 10) {
    return res.render('sign_up', { message: '用户名过长' });
  }
  try {
    let user = await User.getUserByName(username);
    if (user) {
      return res.render('sign_up', { message: '用户名已被占用' });
    } else {
      await User.createUser(username, password);
    }
    return res.render('sign_in', { message: '注册成功，请登录' });
  } catch (err) {
    return res.render('sign_up', { message: err.message });
  }
}

function signIn(req, res, next) {
  let username = req.body.username || '';
  username = validator.escape(username.trim().toLowerCase());
  let password = req.body.password || '';
  password = validator.escape(password.trim());
  if (!username || !password) {
    res.status(422);
    return res.render('sign_in', { message: '信息不完整' });
  }
  // TODO
  res.status(403);
  res.render('sign_in', { message: '用户名或密码错误' });
}

function signOut(req, res, next) {
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, { path: '/' });
  res.redirect('/');
}

module.exports = {
  showSignUp,
  showSignIn,
  signIn,
  signUp,
  signOut,
};
