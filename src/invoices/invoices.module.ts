import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule,PrismaModule], 
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
