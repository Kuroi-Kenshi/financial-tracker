import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Investment } from '@prisma/client';

@Injectable()
export class InvestmentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createInvestmentDto: CreateInvestmentDto) {
    return await this.prisma.investment.create({
      data: {
        ...createInvestmentDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.investment.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.investment.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: number,
    userId: number,
    updateInvestmentDto: UpdateInvestmentDto,
  ) {
    return await this.prisma.investment.updateMany({
      where: { id, userId },
      data: updateInvestmentDto,
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.investment.deleteMany({
      where: { id, userId },
    });
  }
}
