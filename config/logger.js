const winston = require('winston')
const appRoot = require('app-root-path')
require('winston-daily-rotate-file')

const options = {
  dailyRotateErrorFile: {
    filename: `${appRoot}/logs/app.error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD'
  },
  dailyRotateFile: {
    filename: `${appRoot}/logs/app.info-%DATE%.log`,
    datePattern: 'YYYY-MM-DD'
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.DailyRotateFile(options.dailyRotateFile)
  ],
  exitOnError: false
})

const errLogger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile(options.dailyRotateErrorFile)
  ],
  exitOnError: false
})

logger.stream = {
  write (message) {
    logger.info(message)
  }
}

module.exports = {
  logger, errLogger
}
