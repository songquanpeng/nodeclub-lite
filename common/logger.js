const config = require('../config');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const log4js = require('log4js');
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: path.join(config.log_dir, 'app.log') },
  },
  categories: { default: { appenders: ['out', 'app'], level: 'error' } },
});

const logger = log4js.getLogger('app');
logger.level = config.debug && env !== 'test' ? 'DEBUG' : 'ERROR';

module.exports = logger;
