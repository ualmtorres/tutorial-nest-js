import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.class';

@Injectable()
export class BooksService {
  books: Book[] = [
    {
      id: 1,
      title: 'Una historia de España',
      genre: 'Historia',
      description:
        'Un relato ameno, personal, a ratos irónico, pero siempre único, de nuestra accidentada historia a través de los siglos. Una obra concebida por el autor para, en palabras suyas, «divertirme, releer y disfrutar; un pretexto para mirar atrás desde los tiempos remotos hasta el presente, reflexionar un poco sobre ello y contarlo por escrito de una manera poco ortodoxa.',
      author: 'Arturo Pérez-Reverte',
      publisher: 'Alfaguara',
      pages: 256,
      image_url:
        'https://images-na.ssl-images-amazon.com/images/I/41%2B-e981m1L._SX311_BO1,204,203,200_.jpg',
    },
    {
      id: 2,
      title: 'Historia de España contada para escépticos',
      genre: 'Historia',
      description:
        'Como escribe el autor, no pretende ser veraz, justa y desapasionada, porque ninguna historia lo es. No está hecha para halagar a reyes y gobernantes, ni pretende halagar a los banqueros, ni a la Conferencia Episcopal, ni al colectivo gay.',
      author: 'Juan Eslava Galán',
      publisher: 'Booket',
      pages: 592,
      image_url:
        'https://images-na.ssl-images-amazon.com/images/I/51IyZ5Mq8YL._SX326_BO1,204,203,200_.jpg',
    },
  ];
  findAll(params): Book[] {
    return this.books;
  }

  findBook(bookId: string): Book {
    return this.books[parseInt(bookId) - 1];
  }

  createBook(newBook: BookDto): Book {
    let book = new Book();

    book.id = 99;
    book.author = newBook.author;
    book.description = newBook.description;
    book.genre = newBook.genre;
    book.image_url = newBook.image_url;
    book.pages = newBook.pages;
    book.publisher = newBook.publisher;
    book.title = newBook.title;

    return book;
  }

  deleteBook(bookId: string): Book {
    return this.books[parseInt(bookId) - 1];
  }

  updateBook(bookId: string, newBook: BookDto): Book {
    return this.books[parseInt(bookId) - 1];
  }
}
