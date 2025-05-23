import { HttpException, HttpStatus } from '@nestjs/common';
export const handleException = (err: any, httpCode?: number) => {
  if (err?.details) {
    throw new HttpException(err?.details, httpCode || HttpStatus.BAD_REQUEST);
  }

  if (err?.message) {
    throw new HttpException(err?.message, httpCode || HttpStatus.BAD_REQUEST);
  }

  throw new HttpException(err, httpCode || HttpStatus.BAD_REQUEST);
};
