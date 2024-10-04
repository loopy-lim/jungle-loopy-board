import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if (!authorization) {
      throw new UnauthorizedException();
    }
    const token = authorization.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });
      request.user = decoded;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.cookies['access_token']
    return token;
  }
}
