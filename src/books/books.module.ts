import { Module } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyLoggerModule } from '../utilities/my-logger.module';
import { AuthModule } from '../utilities/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Book]), MyLoggerModule, AuthModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
