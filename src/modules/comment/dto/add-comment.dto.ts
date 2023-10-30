import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCommentDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Parent id',
    example: '',
  })
  parentId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'comment',
    example: 'example',
  })
  comment: string;
}
