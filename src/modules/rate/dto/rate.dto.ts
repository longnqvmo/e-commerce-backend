import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class RateDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: '0 < rate <= 5',
    example: 3,
  })
  @Type(() => Number)
  rate: number;
}
