import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Password',
    example: '123a@A',
  })
  password: string;
}
