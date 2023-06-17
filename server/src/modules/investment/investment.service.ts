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

  async findAll() {
    return await this.prisma.investment.findMany();
  }

  async findById(id: number) {
    return await this.prisma.investment.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateInvestmentDto: UpdateInvestmentDto,
  ): Promise<Investment | undefined> {
    const updatedInvestment = await this.prisma.investment.update({
      where: { id },
      data: updateInvestmentDto,
    });

    return updatedInvestment;
  }

  async remove(id: number) {
    return await this.prisma.investment.delete({
      where: { id },
    });
  }
}
