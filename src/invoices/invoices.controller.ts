import { Controller, Get, Param, UseGuards, Query, HttpException, HttpStatus,Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllInvoices(@Query('page') page?: string, @Query('limit') limit?: string) {
    try {
      if (page && limit) {
        const pagination = { page: parseInt(page, 10), limit: parseInt(limit, 10) };
        if (isNaN(pagination.page) || isNaN(pagination.limit)) {
          throw new HttpException('Invalid pagination parameters', HttpStatus.BAD_REQUEST);
        }
        return await this.invoicesService.getPaginatedInvoices(pagination);
      } else {
        return await this.invoicesService.getAllInvoices();
      }
    } catch (error) {
      console.error('Error in controller getAllInvoices:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get('total')
  async getTotalAmount(@Query('dueDate') dueDate: string) {
    if (!dueDate) {
      throw new HttpException('Due date is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const totalAmount = await this.invoicesService.getTotalAmountByDueDate(new Date(dueDate));
      return {
        totalAmount,
      };
    } catch (error) {
      console.error('Error fetching total amount:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getInvoice(@Param('id') id: string) {
    const invoiceId = parseInt(id, 10);
    if (isNaN(invoiceId)) {
      throw new HttpException('Invalid invoice ID', HttpStatus.BAD_REQUEST);
    }
    return this.invoicesService.getInvoice(invoiceId);
  }


 
}
