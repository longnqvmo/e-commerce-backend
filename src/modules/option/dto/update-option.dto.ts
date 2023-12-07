import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOptionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'option',
    example: 'example',
  })
  option: string;
}
