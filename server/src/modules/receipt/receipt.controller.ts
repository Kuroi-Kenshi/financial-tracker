import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  fileStorage,
  fileTypeValidator,
  sizeValidator,
} from '../../config/multerConfig';

import { UploadReceiptDto } from './dto/upload-receipt.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReceiptEntity } from './entities/receipt.entity';

@Controller('receipt')
@ApiTags('Receipt')
export class ReceiptController {
  constructor(private receiptService: ReceiptService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        receipt: {
          type: 'string',
          format: 'binary',
        },
        expenseId: {
          type: 'number',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('receipt', {
      storage: fileStorage('receipts'),
    }),
  )
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [sizeValidator, fileTypeValidator],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadReceiptDto: UploadReceiptDto,
  ) {
    return this.receiptService.create(file, +uploadReceiptDto.expenseId);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ReceiptEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.receiptService.remove(id);
  }
}
