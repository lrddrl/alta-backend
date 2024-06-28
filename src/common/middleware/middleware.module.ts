import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PaginationMiddleware } from './pagination.middleware';
import { InvoicesController } from '../../invoices/invoices.controller';

@Module({})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: 'invoices', method: RequestMethod.GET });
  }
}
