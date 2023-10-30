import { Controller, Post, Put, Request, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { AuthSummary } from 'src/common/constants/summary.constants';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @Public()
  @ApiOperation({ summary: AuthSummary.SIGN_UP })
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.handleSignUp(signUpDTO);
  }

  @Post('sign-in')
  @Public()
  @ApiOperation({ summary: AuthSummary.SIGN_IN })
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.handleSignIn(signInDTO);
  }

  @Put('change-password')
  @ApiOperation({ summary: AuthSummary.CHANGE_PASSWORD })
  changePassword(
    @Request() req: any,
    @Body() changePasswordDTO: ChangePasswordDTO,
  ) {
    return this.authService.handleChangePassword(req.user, changePasswordDTO);
  }
}
