import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadProductImageDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product name',
    example: 'Example',
  })
  image: string;
}
