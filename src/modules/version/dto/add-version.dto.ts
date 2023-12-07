import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddVersionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product id',
    example: 'Example',
  })
  productId: string;

  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'option',
    example: [
      {
        version: 'example',
        description: 'example',
      },
      {
        version: 'example',
        description: 'example',
      },
    ],
  })
  versions: object[];
}
