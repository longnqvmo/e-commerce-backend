import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Category name',
    example: 'Example',
  })
  name: string;
}
