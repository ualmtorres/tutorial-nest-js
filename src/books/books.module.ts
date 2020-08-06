import { Module } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../utilities/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
