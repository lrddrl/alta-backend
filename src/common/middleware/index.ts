import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PaginationMiddleware } from './pagination.middleware';

@Module({
  providers: [PaginationMiddleware],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: 'invoices', method: RequestMethod.GET });
  }
}