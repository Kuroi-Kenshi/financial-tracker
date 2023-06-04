import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

type ErrorCodesStatusMapping = {
  [key: string]: number;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private errorCodesStatusMapping: ErrorCodesStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };
  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));

    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const statusCode = this.errorCodesStatusMapping[exception.code];
    const message =
      exception.meta?.cause || this.exceptionShortMessage(exception.message);

    console.error(
      `[${exception.code}]: ` + this.exceptionShortMessage(exception.message),
    );

    if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
      return super.catch(exception, host);
    }

    super.catch(new HttpException({ statusCode, message }, statusCode), host);
  }
}
