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
    });
  }

  async findAll(userId: number) {
    return await this.prisma.credit.findMany({
      where: { userId },
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.credit.findFirst({
      where: { id, userId },
    });
  }

  async update(id: number, userId: number, updateCreditDto: UpdateCreditDto) {
    return await this.prisma.credit.updateMany({
      where: { id, userId },
      data: updateCreditDto,
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.credit.deleteMany({
      where: { id, userId },
    });
  }
}
