import winston from 'winston';


const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};


const colors = {
  fatal: 'red',
  error: 'red',
  warning: 'yellow',
  info: 'green',
  http: 'green',
  debug: 'blue',
};

winston.addColors(colors);

const logger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.simple()
  ),
  defaultMeta: { service: 'desarrollo' },
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});

export default logger;