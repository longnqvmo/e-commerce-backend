import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddOptionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Attribute id',
    example: '99a95b3d-e77a-44c6-9179-25979ee08114',
  })
  attributeId: string;

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
