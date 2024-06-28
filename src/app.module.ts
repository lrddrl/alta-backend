import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MiddlewareModule } from './common/middleware/middleware.module';

@Module({
  imports: [PrismaModule, InvoicesModule, AuthModule, MiddlewareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
