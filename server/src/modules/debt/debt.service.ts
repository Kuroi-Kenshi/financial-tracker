import { DebtAndCreditStatus } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DebtService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createDebtDto: CreateDebtDto) {
    return await this.prisma.debt.create({
      data: {
        ...createDebtDto,
        status: DebtAndCreditStatus.ACTIVE,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.debt.findMany({
      where: { userId },
      include: {
        currency: true,
        debtor: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.debt.findFirst({
      where: { id, userId },
      include: {
        currency: true,
        debtor: true,
      },
    });
  }

  async update(id: number, userId: number, updateDebtDto: UpdateDebtDto) {
    const updated = await this.prisma.debt.updateMany({
      where: { id, userId },
      data: updateDebtDto,
    });

    if (updated.count) {
      return await this.prisma.debt.findFirst({
        where: { id },
      });
    }
  }

  async remove(id: number, userId: number) {
    const removed = await this.prisma.debt.deleteMany({
      where: { id, userId },
    });

    if (removed.count) return { id };
  }
}
