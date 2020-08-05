import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  Delete,
  Put,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Request } from 'express';
import { BookDto } from './book.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Book } from './book.entity';
import { AppLogger } from '../app.logger';
import * as winston from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { format, transports } from 'winston';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('book')
@Controller('books')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class BooksController {
  private theLogger: AppLogger = new AppLogger();

  /**
   *
   * @param {BooksService} booksService  Servicio de libros
   */
  constructor(
    private booksService: BooksService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly winstonLogger: LoggerService,
  ) {}

  /**
   *
   * @returns {Book[]} Devuelve una lista de libros
   * @param {Request} request Lista de parámetros para filtrar
   */
  @Get()
  @ApiOperation({ summary: 'Obtener lista de libros' })
  @ApiResponse({
    status: 201,
    description: 'Lista de libros',
    type: Book,
  })
  findAll(@Req() request: Request): Promise<Book[]> {
    let startTime = Date.now();
    let data = this.booksService.findAll(request.query);
    let finishTime = Date.now();
    let elapsedTime = finishTime - startTime;
    this.winstonLogger.log(
      `GET. url:/. user:${request['user'].username}. duration: ${elapsedTime}`,
      'BookService',
    );
    /*
    this.theLogger.log(
      `GET. url:/. user:${request['user'].username}. duration: ${elapsedTime}`,
    );
    */
    return data;
  }

  /**
   *
   * @returns {Book} Devuelve un libro específico
   * @param {string} bookId  Identificador del libro a buscar
   */

  @Get(':bookId')
  @ApiOperation({ summary: 'Devuelve información sobre un libro específico' })
  @ApiResponse({
    status: 201,
    description: 'Datos del libro',
  })
  findBook(
    @Req() request: Request,
    @Param('bookId') bookId: string,
  ): Promise<Book> {
    let startTime = Date.now();
    let data = this.booksService.findBook(bookId);
    let finishTime = Date.now();
    let elapsedTime = finishTime - startTime;
    this.winstonLogger.log(
      `GET. url:/${bookId}. user:${request['user'].username}. duration: ${elapsedTime}`,
    );
    return data;
  }

  /**
   *
   * @returns {Book} Devuelve el libro creado
   * @param {JSON} newBook  Libro a crear
   */
  @Post()
  @ApiOperation({ summary: 'Crear un libro' })
  @ApiResponse({
    status: 201,
    description: 'Datos del libro creado',
    type: Book,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createBook(@Req() request: Request, @Body() newBook: BookDto): Promise<Book> {
    let startTime = Date.now();
    let data = this.booksService.createBook(newBook);
    let finishTime = Date.now();
    let elapsedTime = finishTime - startTime;
    this.winstonLogger.log(
      `POST. url:/. user:${request['user'].username}. duration: ${elapsedTime}`,
    );
    return data;
  }

  /**
   *
   * @returns {Book} Eliminar un libro específico
   * @param {string} bookId  Identificador del libro a eliminar
   */
  @Delete(':bookId')
  @ApiOperation({ summary: 'Eliminar un libro específico' })
  @ApiResponse({
    status: 201,
    description: 'Datos del libro eliminado',
  })
  deleteBook(
    @Req() request: Request,
    @Param('bookId') bookId: string,
  ): Promise<Book> {
    let startTime = Date.now();
    let data = this.booksService.deleteBook(bookId);
    let finishTime = Date.now();
    let elapsedTime = finishTime - startTime;
    this.winstonLogger.log(
      `DELETE. url:/${bookId}. user:${request['user'].username}. duration: ${elapsedTime}`,
    );
    return data;
  }

  /**
   *
   * @returns {Book} Modificar un libro específico
   * @param {string} bookId  Identificador del libro a modificar
   * @param {JSON} newBook Libro actualizado
   */
  @Put(':bookId')
  @ApiOperation({ summary: 'Actualizar un libro específico' })
  @ApiResponse({
    status: 201,
    description: 'Datos del libro actualizado',
  })
  updateBook(
    @Req() request: Request,
    @Param('bookId') bookId: string,
    @Body() newBook: BookDto,
  ): Promise<Book> {
    let startTime = Date.now();
    let data = this.booksService.updateBook(bookId, newBook);
    let finishTime = Date.now();
    let elapsedTime = finishTime - startTime;
    this.winstonLogger.log(
      `PUT. url:/${bookId}. user:${request['user'].username}. duration: ${elapsedTime}`,
    );
    return data;
  }
}
