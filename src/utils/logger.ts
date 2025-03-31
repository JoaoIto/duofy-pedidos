import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      singleLine: true,
      translateTime: 'dd/mm/yyyy HH:MM:ss',
    },
  },
  level: 'debug',
});

export default logger;
