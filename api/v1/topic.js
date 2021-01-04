const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const TopicModel = require('../../models').Topic;

async function create(req, res, next) {
  let title = req.body.title || '';
  title = validator.escape(title.trim());
  let tag = req.body.tag || 'others';
  tag = validator.escape(title.trim());
  let content = req.body.content || '';
  content = validator.escape(content.trim());
  // TODO
  let error_msg = '';
  if (title.length < 5 || title.length > 100) {
    error_msg = '标题长度不符合要求';
  } else if (tag.length > 20) {
    error_msg = '标签过长';
  } else if (content.length === 0) {
    error_msg = '内容不能为空';
  }
  if (error_msg === '') {
    res.status(400).json({
      success: false,
      error_msg,
    });
  } else {
    await TopicModel.create({
      title,
      tag,
      content,
      user: {
        id: req.user.id,
      },
    });
    res.json({
      success: true,
      error_msg,
    });
  }
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
