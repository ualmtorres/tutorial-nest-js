import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config/config.service';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './utilities/logger.config';

const logger: LoggerConfig = new LoggerConfig();
@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    /*
    WinstonModule.forRootAsync({
      useFactory: () => ({
        // options
      }),
      inject: [],
    }),
    */
    WinstonModule.forRoot(logger.console()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
