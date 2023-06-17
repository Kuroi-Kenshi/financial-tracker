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
      data: createBudgetPlanDto,
    });
  }

  async findAll() {
    return await this.prisma.budgetPlan.findMany();
  }

  async findById(id: number) {
    return await this.prisma.budgetPlan.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBudgetPlanDto: UpdateBudgetPlanDto) {
    return await this.prisma.budgetPlan.update({
      where: { id },
      data: updateBudgetPlanDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.budgetPlan.delete({
      where: { id },
    });
  }
}
