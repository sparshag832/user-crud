import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let error = exception;
    if (exception['response']) {
      error = exception['response'];
      if (exception['response']['message']) {
        error = exception['response']['message'];
      }
    }
    response.status(status).json({ error, statusCode: status, status: 'Bad' });
  }
}
