import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCounterpartDto } from './dto/create-counterpart.dto';
import { UpdateCounterpartDto } from './dto/update-counterpart.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CounterpartService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createCounterpartDto: CreateCounterpartDto) {
    const counterpart = await this.prisma.counterpart.findUnique({
      where: {
        name: createCounterpartDto.name,
      },
    });

    if (counterpart) {
      throw new BadRequestException({
        message: 'Контрагент с таким именем уже существует',
      });
    }

    return await this.prisma.counterpart.create({
      data: {
        ...createCounterpartDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.counterpart.findMany({
      where: { userId },
    });
  }

  async findById(id: number, userId: number) {
    const counterpart = await this.prisma.counterpart.findFirst({
      where: { id, userId },
    });

    if (!counterpart) {
      throw new NotFoundException(
        `Запись о контрагенте с id = ${id} не найдена`,
      );
    }

    return counterpart;
  }

  async update(
    id: number,
    userId: number,
    updateCounterpartDto: UpdateCounterpartDto,
  ) {
    return await this.prisma.counterpart.updateMany({
      where: { id, userId },
      data: updateCounterpartDto,
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.counterpart.deleteMany({
      where: { id, userId },
    });
  }
}
