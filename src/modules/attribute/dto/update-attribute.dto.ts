import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAttributeDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'attribute',
    example: 'size',
  })
  attribute: string;
}
