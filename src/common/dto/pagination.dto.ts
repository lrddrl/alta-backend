import { z } from 'zod';

export const PaginationDtoSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type PaginationDto = z.infer<typeof PaginationDtoSchema>;
