import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class IdDTO {
  @IsOptional()
  @ApiProperty({
    description: 'Id',
    example: '',
  })
  id: string;
}
