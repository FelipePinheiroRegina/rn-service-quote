import { FilterQuoteListSchema } from '@/types/filterQuoteList'
import { ORDER_BY } from '@/types/orderBy'

export const FILTER_QUOTE_LIST_DEFAULT: FilterQuoteListSchema = {
  status: [],
  orderBy: ORDER_BY.MOST_RECENT,
  search: '',
}
