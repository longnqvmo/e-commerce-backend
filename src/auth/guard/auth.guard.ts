import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { jwtConfig } from 'src/configs/app.config';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { WarningMessage } from 'src/common/constants/message.constants';
import { Role } from 'src/common/enums/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw HttpResponse(HttpStatus.UNAUTHORIZED, WarningMessage.SIGN_IN);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret,
      });
      request['user'] = payload;
      if (!requiredRoles) {
        return true;
      }
      if (request.user.role === Role.ADMIN) {
        return true;
      }
      if (requiredRoles.some((role) => request.user.role?.includes(role))) {
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw HttpResponse(HttpStatus.FORBIDDEN, WarningMessage.PERMISSION);
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
