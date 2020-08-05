// import { config } from '../config';
import * as path from 'path';
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { format } from 'winston';

export class AppLogger implements LoggerService {
  private logger: winston.Logger;
  constructor(label?: string) {
    this.initializeLogger(label);
  }
  initializeLogger(label?: string) {
    this.logger = winston.createLogger({
      level: 'info',
      //level: config.logger.level,
      //format: winston.format.json(),
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
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
      ],
    });
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  }
  error(message: string, trace: string) {
    this.logger.log('error', 'MyLogger error - ' + message);
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.log('warn', 'MyLogger error - ' + message);
  }

  log(message: string) {
    this.logger.log('info', message);
  }
}
