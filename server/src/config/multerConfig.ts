import {
  BadRequestException,
  FileTypeValidator,
  InternalServerErrorException,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'node:path';

const FILE_SIZE_IN_BYTES = 1024 * 1024 * 5;

const normalizeFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
): void => {
  try {
    const fileExtName = extname(file.originalname);

    if (!fileExtName) {
      throw new BadRequestException('Некорректный тип файла');
    }
    callback(null, `${nanoid()}${fileExtName}`);
  } catch (error) {
    console.log('error', error);
    if (error instanceof InternalServerErrorException) {
      throw new InternalServerErrorException(error.message);
    }

    throw new InternalServerErrorException(
      'Произошла неизвестная ошибка сервера',
    );
  }
};

export const sizeValidator = new MaxFileSizeValidator({
  maxSize: FILE_SIZE_IN_BYTES,
});

export const fileTypeValidator = new FileTypeValidator({
  fileType: /(jpg|jpeg|png|gif)$/,
});

export const fileStorage = (folderName: string) =>
  diskStorage({
    destination: `uploads/${folderName}`,
    filename: normalizeFileName,
  });
