import { DebtAndCreditStatus } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
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

  async findAll() {
    return await this.prisma.credit.findMany();
  }

  async findById(id: number) {
    return await this.prisma.credit.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCreditDto: UpdateCreditDto) {
    return await this.prisma.credit.update({
      where: { id },
      data: updateCreditDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.credit.delete({
      where: { id },
    });
  }
}
