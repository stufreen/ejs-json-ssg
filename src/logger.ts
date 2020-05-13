import winston, { format, transports, Logger } from 'winston';

let logger;

export function initializeLogger(infoLevel: string): Logger {
  logger = winston.createLogger({
    level: infoLevel,
    format: format.prettyPrint(),
    transports: [new transports.Console()],
  });
  return logger;
}

export default logger;
