import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMailDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'to',
    example: 'example@gmail.com',
  })
  to: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'subject',
    example: 'Reset password code',
  })
  subject: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'body',
    example:
      'Enter the code below to reset your password, the code is expire after 15 min: 259463',
  })
  body: string;
}
