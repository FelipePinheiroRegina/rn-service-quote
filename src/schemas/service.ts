import { z } from 'zod'

export const schemaService = z.object({
  id: z.string().optional(),
  title: z.string().min(5).max(80),
  description: z.string().min(1).max(255),
  qtd: z.number().positive(),
  totalInCents: z.number().positive(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})
