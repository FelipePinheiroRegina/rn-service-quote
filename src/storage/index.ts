import {
  copyQuote,
  createQuote,
  deleteQuote,
  getQuotes,
  updateQuote,
} from './quoteStorage'
import { getServices, saveServices } from './serviceStorage'

export const storage = {
  getQuotes,
  createQuote,
  getServices,
  saveServices,
  copyQuote,
  deleteQuote,
  updateQuote,
}
