import { Request } from 'express';
import { PaginationDto } from '../dto/pagination.dto';

export interface ExtendedRequest extends Request {
  pagination?: PaginationDto;
}
