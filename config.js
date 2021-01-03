let config = {
  debug: true,
  port: process.env.PORT || 3000,
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',
  log_dir: 'logs',
  session_secret: 'justice',

  site_name: 'Nodeclub Lite',
  site_description: 'Lite version for Nodeclub',
  site_keywords: 'nodeclub lite',
  site_navs: ['/about', '关于'],
  list_topic_count: 20,
  allow_sign_up: true,
};

function init() {}
init();

module.exports = config;
