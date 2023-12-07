import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddAttributeDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'attribute',
    example: 'size',
  })
  attribute: string;

  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'option',
    example: [
      {
        option: 'X',
      },
      {
        option: 'XL',
      },
    ],
  })
  options: object[];
}
