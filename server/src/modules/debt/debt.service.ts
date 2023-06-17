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

  async findAll() {
    return await this.prisma.debt.findMany();
  }

  async findById(id: number) {
    return await this.prisma.debt.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDebtDto: UpdateDebtDto) {
    return await this.prisma.debt.update({
      where: { id },
      data: updateDebtDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.debt.delete({
      where: { id },
    });
  }
}
