import { DebtAndCreditStatus } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCreditDto } from './dto/create-creditor.dto';
import { UpdateCreditDto } from './dto/update-creditor.dto';

@Injectable()
export class CreditService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createCreditDto: CreateCreditDto) {
    return await this.prisma.credit.create({
      data: {
        ...createCreditDto,
        status: DebtAndCreditStatus.ACTIVE,
        userId,
      },
      include: {
        creditor: true,
        currency: true,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.credit.findMany({
      where: { userId },
      include: {
        currency: true,
        creditor: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.credit.findFirst({
      where: { id, userId },
      include: {
        currency: true,
        creditor: true,
      },
    });
  }

  async update(id: number, userId: number, updateCreditDto: UpdateCreditDto) {
    const updated = await this.prisma.credit.updateMany({
      where: { id, userId },
      data: updateCreditDto,
    });

    if (updated.count) {
      return await this.prisma.credit.findFirst({
        where: { id },
      });
    }
  }

  async remove(id: number, userId: number) {
    const removed = await this.prisma.credit.deleteMany({
      where: { id, userId },
    });

    if (removed.count) return { id };
  }
}
