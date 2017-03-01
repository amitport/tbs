const winston = require('winston');

module.exports = {
  log: new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: process.env.LOG_LEVEL || 'debug',
        colorize: true
      })
    ]
  }),

  paths: {
    client: __dirname + '/../../client'
  },
  port: process.env.PORT || 3000,

  appName: process.env.npm_package_name ? process.env.npm_package_name : 'tbs',

  db: {
    "mongo-uri": `mongodb://localhost/${process.env.npm_package_name ? `${process.env.npm_package_name}-` : ''}dev`
  }
}
