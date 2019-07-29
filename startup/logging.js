const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({ handleExceptions: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log', handleExceptions: true })
  );
  process.on('unhandledRejection', ex => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(
    new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/vidly', level: 'info' })
  );
  winston.add(new winston.transports.Console());
};
