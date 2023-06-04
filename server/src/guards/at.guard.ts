import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      //проверяем есть ли метаданные isPublic на хэндлере
      context.getHandler(),
      //проверяем есть ли метаданные isPublic на классе
      context.getClass(),

      //метаданные isPublic устанавливаются с помощью декоратора isPublic
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
