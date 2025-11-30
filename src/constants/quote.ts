import { QuoteSchema } from '@/types/quote'
import { STATUS } from '@/types/status'

export const QUOTE_FORM_DEFAULT: QuoteSchema = {
  id: '',
  title: '',
  client: '',
  status: STATUS.DRAFT,
  subtotalInCents: 0,
  discount: {
    percentage: 0,
    amountInCents: 0,
  },
  totalInCents: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
}
