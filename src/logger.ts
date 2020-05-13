import winston, { format, transports } from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});

export function setLoggerLevel(infoLevel: string): void {
  logger.level = infoLevel;
}

export default logger;
