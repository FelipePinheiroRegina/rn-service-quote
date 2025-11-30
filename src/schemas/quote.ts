import { z } from 'zod'
import { STATUS } from '@/types/status'

export const schemaQuote = z.object({
  id: z.string().optional(),
  title: z.string().min(5).max(80),
  client: z.string().min(1).max(80),
  status: z.nativeEnum(STATUS),
  subtotalInCents: z.number().positive(),
  discount: z.object({
    percentage: z.number().positive().min(0).max(100),
    amountInCents: z.number().positive(),
  }),
  totalInCents: z.number().positive(),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
})
