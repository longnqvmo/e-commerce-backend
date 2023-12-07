import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateVersionDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Product version',
    example: 'Example',
  })
  version: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Version description',
    example: 'Example',
  })
  description: string;
}
