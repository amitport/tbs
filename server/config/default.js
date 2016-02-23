import winston from 'winston';

export const log = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'debug',
      colorize: true
    })
  ]
});

export const paths = {
  client: __dirname + '/../../client'
};
export const port = process.env.PORT || 3000;

export const appName = process.env.npm_package_name;

export const db = {
  "mongo-uri": `mongodb://localhost/${process.env.npm_package_name ? `${process.env.npm_package_name}-` : ''}dev`
};
