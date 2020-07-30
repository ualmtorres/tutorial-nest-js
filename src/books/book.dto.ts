import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ example: 'Don Quijote de la Mancha' })
  readonly title: string;

  @ApiProperty({ example: 'Novela' })
  readonly genre: string;

  @ApiProperty({
    example: 'Esta edición del Ingenioso hidalgo don Quijote de la Mancha ...',
  })
  readonly description: string;

  @ApiProperty({ example: 'Miguel de Cervantes' })
  readonly author: string;

  @ApiProperty({ example: 'Santillana' })
  readonly publisher: string;

  @ApiProperty({ example: 592 })
  readonly pages: number;

  @ApiProperty({ example: 'www.imagen.com/quijote.png' })
  readonly image_url: string;
}
