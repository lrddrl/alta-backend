import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { PaginationDtoSchema } from '../dto/pagination.dto';
import { ExtendedRequest } from '../types/extended-request';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { page, limit } = req.query;

    const parsedPage = PaginationDtoSchema.safeParse({
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });

    if (!parsedPage.success) {
      console.error('Pagination validation error:', parsedPage.error.errors);
      res.status(400).json({
        statusCode: 400,
        message: 'Validation failed',
        errors: parsedPage.error.errors,
      });
      return;
    }

    req.pagination = parsedPage.data;
    next();
  }
}
