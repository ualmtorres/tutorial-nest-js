import { ApiProperty } from '@nestjs/swagger';
export class Book {
  @ApiProperty({ example: 99 })
  id: number;

  @ApiProperty({ example: 'Don Quijote de la Mancha' })
  title: string;

  @ApiProperty({ example: 'Novela' })
  genre: string;

  @ApiProperty({
    example: 'Esta edición del Ingenioso hidalgo don Quijote de la Mancha ...',
  })
  description: string;

  @ApiProperty({ example: 'Miguel de Cervantes' })
  author: string;

  @ApiProperty({ example: 'Santillana' })
  publisher: string;

  @ApiProperty({ example: 592 })
  pages: number;

  @ApiProperty({ example: 'www.imagen.com/quijote.png' })
  image_url: string;
}
