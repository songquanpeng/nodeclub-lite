const express = require('express');
const redis = require('redis');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const serveStatic = require('serve-static');
const cors = require('cors');
const crypto = require('crypto');
const logger = require('./common/logger');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

const webRouter = require('./routes/web-router');
const apiRouterV1 = require('./routes/api-router.v1');

let config = require('./config');
const http = require('http');
const app = express();
app.locals.config = config;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals._layoutFile = 'layout.html';
app.use(
  serveStatic(path.join(__dirname, 'public'), {
    maxAge: '600000',
  })
);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(require('cookie-parser')(config.session_secret));
app.use(compression());
app.use(
  session({
    secret: config.session_secret,
    store: new RedisStore({
      client: redisClient,
      port: config.redis_port,
      host: config.redis_host,
      db: config.redis_db,
      pass: config.redis_password,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/v1', cors(), apiRouterV1);
app.use('/', webRouter);

app.use((req, res, next) => {
  if (!res.headersSent) {
    res.status(404);
  }
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.locals.message = err.message;
  console.error(err.stack);
  if (!res.headersSent) {
    res.send(err.message);
  }
});

const server = http.createServer(app);
const port = app.locals.config.port;
server.listen(port);

server.on('error', (err) => {
  logger.fatal(
    `An error occurred on the server, please check if port ${port} is occupied.`
  );
  logger.fatal(err);
});

server.on('listening', () => {
  logger.info(`Server listen on port: ${port}.`);
});

module.exports = app;
