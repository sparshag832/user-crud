
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Auth Token Not Found');
    }
    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    return request.header('auth');
  }
}
