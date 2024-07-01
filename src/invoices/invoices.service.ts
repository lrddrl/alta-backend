import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async getAllInvoices() {
    try {
      return await this.prisma.invoice.findMany();
    } catch (error) {
      console.error('Error fetching all invoices:', error);
      throw new Error('Failed to fetch all invoices');
    }
  }

  async getPaginatedInvoices(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;
    const take = limit;

    try {
      return await this.prisma.invoice.findMany({
        skip,
        take,
      });
    } catch (error) {
      console.error('Error fetching paginated invoices:', error);
      throw new Error('Failed to fetch paginated invoices');
    }
  }

  async getInvoice(id: number) {
    try {
      return await this.prisma.invoice.findUnique({ where: { id } });
    } catch (error) {
      console.error('Error fetching invoice:', error);
      throw new Error('Failed to fetch invoice');
    }
  }

  async getTotalAmountByDueDate(dueDate: Date): Promise<number> {
    try {
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
    } catch (error) {
      console.error('Error fetching total amount:', error);
      throw new Error('Failed to fetch total amount');
    }
  }
}
