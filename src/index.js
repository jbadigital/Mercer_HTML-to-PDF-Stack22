/* eslint-disable no-console */
require('dotenv').config();
const throng = require('throng');

const logger = require('./logger');

var WORKERS = process.env.WEB_CONCURRENCY || 0;

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start
});

function start() {

  const app = require('./app');
  const port = process.env.PORT || app.get('port');
  const server = app.listen(port);

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () =>
    logger.info('Application started on http://%s:%d', app.get('host'), port)
  );

}
