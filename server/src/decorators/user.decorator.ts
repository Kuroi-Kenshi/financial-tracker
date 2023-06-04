import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { JwtPayloadWithRt } from 'src/modules/auth/auth.types';

export const CurrentUser = createParamDecorator(
  (field: keyof JwtPayloadWithRt | undefined, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;

      return field ? user[field] : user;
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException({ message: error.message });
      }
    }
  },
);
