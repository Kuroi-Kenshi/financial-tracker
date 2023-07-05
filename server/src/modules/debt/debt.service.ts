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
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.debt.findFirst({
      where: { id, userId },
    });
  }

  async update(id: number, userId: number, updateDebtDto: UpdateDebtDto) {
    return await this.prisma.debt.updateMany({
      where: { id, userId },
      data: updateDebtDto,
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.debt.deleteMany({
      where: { id, userId },
    });
  }
}
