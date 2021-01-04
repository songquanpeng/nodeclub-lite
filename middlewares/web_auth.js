exports.userRequired = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.isBlocked) {
      return res.render('message', {
        isError: true,
        message: '用户账户被禁用，请联系管理员',
        link: '/feedback',
      });
    }
  } else {
    return res.render('message', {
      isError: false,
      message: '用户尚未登录，请登录',
      link: '/login',
    });
  }
  next();
};

exports.modRequired = (req, res, next) => {
  if (!req.session.user || !req.session.user.isModerator) {
    return res.render('message', { isError: true, message: '需要管理员权限' });
  }
  next();
};

exports.adminRequired = (req, res, next) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.render('message', {
      isError: true,
      message: '需要超级管理员权限',
    });
  }
  next();
};
