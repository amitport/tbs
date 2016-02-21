import winston from 'winston';
import split from 'split';

export const log = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'debug',
      colorize: true
    })
  ]
});
export const httpLogStream = split().on('data', function (message) {
  log.silly(message);
});

export const robotsDisallow = "/"; // disallow everything
export const paths = {
  client: __dirname + '/../../client'
};
export const port = process.env.PORT || 9000;
