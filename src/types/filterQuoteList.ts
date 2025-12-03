import { schemaFilterQuoteList } from '@/schemas/filterQuoteList'
import { z } from 'zod'

export type FilterQuoteListSchema = z.infer<typeof schemaFilterQuoteList>
