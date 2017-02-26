const mongoose = require('mongoose');
const config = require('config');

const log = config.get('log');

mongoose.connect(config.get('db.mongo-uri'));
mongoose.connection.on('error', function (err) {
    log.error('mongoose: ' + err.message);
});
mongoose.connection.once('open', log.info.bind(log, 'mongoose connection open'));
