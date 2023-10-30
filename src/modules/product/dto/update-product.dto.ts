import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product name',
    example: 'Example',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product description',
    example: 'Example',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Product price',
    example: 'Example',
  })
  price: number;
}
