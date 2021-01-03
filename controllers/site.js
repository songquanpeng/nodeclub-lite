const Topic = require('../models').Topic;

function index(req, res, next) {
  let page = parseInt(req.query.page, 10) || 1;
  page = page > 0 ? page : 1;
  let tab = req.query.tab || 'all';
  res.render('index', { pages: [] });
}

module.exports = {
  index,
};
