import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
}
