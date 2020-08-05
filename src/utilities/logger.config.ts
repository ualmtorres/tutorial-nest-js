import { format, transports } from 'winston';
import * as winston from 'winston';
import * as path from 'path';

export class LoggerConfig {
  private readonly options: winston.LoggerOptions;

  constructor() {
    this.options = {
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(msg => {
          return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
        }),
      ),
      defaultMeta: { service: 'BooksService' },
      transports: [
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/debug/'),
          filename: 'debug.log',
          level: 'debug',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'),
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        new transports.Console({ level: 'debug' }),
      ],
    };
  }

  public console(): object {
    return this.options;
  }
}
