import { z } from 'zod'
import { STATUS } from '@/types/status'

export const schemaQuote = z.object({
  id: z.string().optional(),
  title: z.string().min(5).max(80),
  client: z.string().min(1).max(80),
  status: z.nativeEnum(STATUS),
  subtotalInCents: z.number().min(0),
  discount: z.object({
    percentage: z.number().min(0).max(100),
    amountInCents: z.number().min(0),
  }),
  totalInCents: z.number().min(0),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
})
