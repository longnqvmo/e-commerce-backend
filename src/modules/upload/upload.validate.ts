import { BadRequestException } from '@nestjs/common';
import { UploadFileError, REGEX_IMAGE_TYPE } from './upload.constants';

export const imageFileValidate = (file: any) => {
  if (!file) {
    throw new BadRequestException(UploadFileError.INVALID_FILE);
  } else if (!file.originalname.match(REGEX_IMAGE_TYPE)) {
    throw new BadRequestException(UploadFileError.NOT_ALLOWED_IMAGE_FILE);
  } else if (file.size > process.env.LIMIT_FILE_SIZE) {
    throw new BadRequestException(UploadFileError.INVALID_LIMIT_FILE);
  }
  return true;
};
