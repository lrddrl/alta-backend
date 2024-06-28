import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async getAllInvoices(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;
    const take = limit;

    return this.prisma.invoice.findMany({
      skip,
      take,
    });
  }

  async getInvoice(id: number) {
    return this.prisma.invoice.findUnique({ where: { id } });
  }

  async getTotalAmountByDueDate(dueDate: Date): Promise<number> {
    const result = await this.prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        due_date: {
          lte: dueDate,
        },
      },
    });
    return result._sum.amount ?? 0;
  }
}
