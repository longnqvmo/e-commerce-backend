import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';

export class AddProductDTO {
  @IsObject()
  @ApiProperty({
    description: 'product',
    example: {
      name: 'example',
      description: 'example',
    },
  })
  product: object;

  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'version',
    example: [
      {
        version: 'example',
        description: 'example',
        attributes: [
          {
            attributeId: 'attribute-id',
            optionId: 'option-id',
          },
          {
            attributeId: 'attribute-id',
            optionId: 'option-id',
          },
        ],
      },
      {
        version: 'example',
        description: 'example',
        attributes: [
          {
            attributeId: 'attribute-id',
            optionId: 'option-id',
          },
        ],
      },
    ],
  })
  versions: object[];
}
