export enum UploadFileError {
  INVALID_FILE = 'Invalid file',
  NOT_ALLOWED_IMAGE_FILE = 'Only image files are allowed!',
  INVALID_LIMIT_FILE = 'Only accept file limit 1mb',
}

export const REGEX_IMAGE_TYPE =
  /\.(jpg|jpeg|png|gif|pdf|JPG|PNG|JEPG|GIF|PDF)$/;
