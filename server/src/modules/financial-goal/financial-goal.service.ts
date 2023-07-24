import { Injectable } from '@nestjs/common';
import { CreateFinancialGoalDto } from './dto/create-financial-goal.dto';
import { UpdateFinancialGoalDto } from './dto/update-financial-goal.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinancialGoalService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createFinancialGoalDto: CreateFinancialGoalDto) {
    return await this.prisma.financialGoal.create({
      data: {
        ...createFinancialGoalDto,
        userId,
      },
      include: {
        currency: true,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.financialGoal.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
        deadline: true,
        amount: true,
        totalAmount: true,
        currency: true,
      },
      orderBy: {
        deadline: 'asc',
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.financialGoal.findMany({
      where: { id, userId },
    });
  }

  async update(
    id: number,
    userId: number,
    updateFinancialGoalDto: UpdateFinancialGoalDto,
  ) {
    const updated = await this.prisma.financialGoal.updateMany({
      where: { id, userId },
      data: updateFinancialGoalDto,
    });

    if (updated.count) {
      return await this.prisma.financialGoal.findFirst({
        where: { id },
      });
    }
  }

  async remove(id: number, userId: number) {
    const removed = await this.prisma.financialGoal.deleteMany({
      where: { id, userId },
    });

    if (removed.count) return { id };
  }
}
