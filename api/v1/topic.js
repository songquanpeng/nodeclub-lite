const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const TopicModel = require('../../models').Topic;

async function create(req, res, next) {
  let title = req.body.title || '';
  title = validator.escape(title.trim());
  let content = req.body.content || '';
  content = validator.escape(content.trim());
  // TODO
  let error_msg = undefined;
  if (title.length < 5 || title.length > 100) {
    error_msg = '标题长度不符合要求';
  }
  if (error_msg) {
    res.status(400).send({
      success: false,
      error_msg,
    });
  }
  await TopicModel.create({
    title,
  });
}

function get(req, res, next) {}

function update(req, res, next) {}

function remove(req, res, next) {}

module.exports = {
  create,
  get,
  update,
  remove,
};
