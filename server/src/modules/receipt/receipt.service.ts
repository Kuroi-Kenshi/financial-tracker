import { Injectable } from '@nestjs/common';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SERVE_ROOT } from './receipt.constants';

@Injectable()
export class ReceiptService {
  constructor(private prisma: PrismaService) {}
  create(file: Express.Multer.File, expenseId: number) {
    const { destination, filename, mimetype, originalname, size } = file;

    return this.prisma.receipt.create({
      data: {
        filePath: `${SERVE_ROOT}/${destination}`,
        mimetype,
        fileName: filename,
        originalName: originalname,
        size,
        expenseId,
      },
    });
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return this.prisma.receipt.update({
      where: { id },
      data: updateReceiptDto,
    });
  }

  remove(id: number) {
    return this.prisma.receipt.delete({
      where: { id },
    });
  }
}
