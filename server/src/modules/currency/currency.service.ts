import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.currency.findMany({
      orderBy: {
        code: 'asc',
      },
    });
  }
}
