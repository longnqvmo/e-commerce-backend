import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';

export class ProductDTO {
  @IsObject()
  @ApiProperty({
    description: 'name',
    example: 'example',
  })
  name: string;

  @IsArray()
  @ApiProperty({
    description: 'description',
    example: 'example',
  })
  description: string;
}

export class AddProductDTO {
  @IsObject()
  @ApiProperty({
    description: 'product',
    example: {
      name: 'example',
      description: 'example',
    },
  })
  product: object;

  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'version',
    example: [
      {
        version: 'Example',
        description: 'Example',
      },
      {
        version: 'Example',
        description: 'Example',
      },
    ],
  })
  versions: any;
}
