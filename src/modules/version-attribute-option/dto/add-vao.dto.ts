import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddVersionAttributeDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'version id',
    example: 'example',
  })
  versionId: string;

  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'option',
    example: [
      {
        attributeId: 'X',
        optionId: 'X',
      },
      {
        attributeId: 'X',
        optionId: 'X',
      },
    ],
  })
  attributes: object[];
}
