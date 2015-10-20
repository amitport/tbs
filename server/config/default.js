import winston from 'winston';
import split from 'split';

const log = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'debug',
      colorize: true
    })
  ]
});
require('winston/node_modules/colors').enabled = true; // workaround for https://github.com/winstonjs/winston/issues/616 TODO revisit this

export default {
  robotsDisallow: "/", // disallow everything
  log: log,
  httpLogStream: split().on('data', function (message) {
    log.silly(message);
  }),
  paths: {
    client: __dirname + '/../../client'
  },
  port: process.env.PORT || 9000
};
