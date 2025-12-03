import { z } from 'zod'
import { STATUS } from '@/types/status'
import { ORDER_BY } from '@/types/orderBy'

export const schemaFilterQuoteList = z.object({
  status: z.array(z.nativeEnum(STATUS)),
  orderBy: z.nativeEnum(ORDER_BY),
  search: z.string().optional(),
})
