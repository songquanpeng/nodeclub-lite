// TODO: 检查 TOKEN 是否合法以及其对应的用户是否具有相应的权限。

exports.userRequired = (req, res, next) => {
  return res.json({
    success: false,
    err_msg: '非法的 TOKEN',
  });
};

exports.modRequired = (req, res, next) => {
  return res.json({
    success: false,
    err_msg: '需要管理员权限',
  });
};

exports.adminRequired = (req, res, next) => {
  return res.json({
    success: false,
    err_msg: '需要超级管理员权限',
  });
};
