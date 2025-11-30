import { z } from 'zod'
import { schemaQuote } from '@/schemas/quote'

export type QuoteSchema = z.infer<typeof schemaQuote>