import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Request } from 'express';
import { BookDto } from './book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './book.interface';

@ApiTags('book')
@Controller('books')
export class BooksController {
  /**
   *
   * @param {BooksService} booksService  Servicio de libros
   */
  constructor(private booksService: BooksService) {}

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
    type: BookDto,
  })
  findAll(@Req() request: Request): Book[] {
    console.log(request.query);
    return this.booksService.findAll(request.query);
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
  findBook(@Param('bookId') bookId: string): Book {
    return this.booksService.findBook(bookId);
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
    type: BookDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createBook(@Body() newBook: BookDto): BookDto {
    return this.booksService.createBook(newBook);
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
  deleteBook(@Param('bookId') bookId: string): Book {
    return this.booksService.deleteBook(bookId);
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
  updateBook(@Param('bookId') bookId: string, @Body() newBook: BookDto): Book {
    return this.booksService.updateBook(bookId, newBook);
  }
}
