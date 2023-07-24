import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBudgetPlanDto } from './dto/create-budget-plan.dto';
import { UpdateBudgetPlanDto } from './dto/update-budget-plan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BudgetPlanService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createBudgetPlanDto: CreateBudgetPlanDto) {
    const plan = await this.prisma.budgetPlan.findUnique({
      where: {
        name: createBudgetPlanDto.name,
      },
    });

    if (plan) {
      throw new BadRequestException({
        message: 'План с таким именем уже существует',
      });
    }

    return await this.prisma.budgetPlan.create({
      data: {
        ...createBudgetPlanDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.budgetPlan.findMany({
      where: { userId },
      include: {
        expenseCategories: true,
        currency: true,
      },
    });
  }

  async findAllWithExpense(userId: number) {
    return await this.prisma.budgetPlan.findMany({
      where: { userId },
      include: {
        expenseCategories: true,
        currency: true,
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.budgetPlan.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: number,
    userId: number,
    updateBudgetPlanDto: UpdateBudgetPlanDto,
  ) {
    return await this.prisma.budgetPlan.updateMany({
      where: { id, userId },
      data: updateBudgetPlanDto,
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.budgetPlan.deleteMany({
      where: { id, userId },
    });
  }
}
