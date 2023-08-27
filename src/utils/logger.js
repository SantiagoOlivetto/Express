import winston from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: './events.log',
      level: 'warn',
      format: winston.format.simple(),
    }),
  ],
});
