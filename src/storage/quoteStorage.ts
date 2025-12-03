import { QuoteSchema } from '@/types/quote'
import { ServiceSchema } from '@/types/service'
import { generateId } from '@/utils/generateId'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteServices, getServices, saveServices } from './serviceStorage'
import { FilterQuoteListSchema } from '@/types/filterQuoteList'
import { ORDER_BY } from '@/types/orderBy'

export const QUOTE_STORAGE_KEY = '@rn-service-quote:quotes'

export async function getQuotes(): Promise<QuoteSchema[]> {
  const quotes = await AsyncStorage.getItem(QUOTE_STORAGE_KEY)
  return quotes ? JSON.parse(quotes) : []
}

export async function createQuote(
  quote: QuoteSchema,
  services: ServiceSchema[]
) {
  const quotes = await getQuotes()
  const quoteId = generateId()
  const newQuote = {
    ...quote,
    id: quoteId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  quotes.push(newQuote)
  await Promise.all([
    AsyncStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(quotes)),
    saveServices(services, quoteId),
  ])
  return newQuote
}

export async function getQuotesWithFilters(
  filters: FilterQuoteListSchema
): Promise<QuoteSchema[]> {
  const quotes = await getQuotes()

  // 1. Filtrar por status
  // Se não houver status selecionado (array vazio), retorna todos
  let filteredQuotes =
    filters.status.length === 0
      ? quotes
      : quotes.filter((quote: QuoteSchema) =>
          filters.status.includes(quote.status)
        )

  // 2. Filtrar por busca (título ou cliente)
  if (filters.search && filters.search.trim() !== '') {
    const searchLower = filters.search.toLowerCase().trim()
    filteredQuotes = filteredQuotes.filter(
      (quote: QuoteSchema) =>
        quote.title.toLowerCase().includes(searchLower) ||
        quote.client.toLowerCase().includes(searchLower)
    )
  }

  // 3. Ordenar conforme o filtro
  const sortedQuotes = [...filteredQuotes].sort(
    (a: QuoteSchema, b: QuoteSchema) => {
      switch (filters.orderBy) {
        case ORDER_BY.MOST_RECENT:
          // Mais recente primeiro
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )

        case ORDER_BY.OLDEST:
          // Mais antigo primeiro
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )

        case ORDER_BY.HIGHEST:
          // Maior valor primeiro
          return b.totalInCents - a.totalInCents

        case ORDER_BY.LOWEST:
          // Menor valor primeiro
          return a.totalInCents - b.totalInCents

        default:
          // Padrão: mais recente
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
      }
    }
  )

  return sortedQuotes
}

export async function copyQuote(quoteId: string) {
  const quotes = await getQuotes()

  const quote = quotes.find((q: QuoteSchema) => q.id === quoteId)

  if (!quote) {
    throw new Error(`Quote with id ${quoteId} not found`)
  }

  const services = await getServices(quoteId)

  // Remove o ID do quote para criar um novo (com novo ID gerado)
  const { id, createdAt, updatedAt, ...quoteWithoutId } = quote

  const newQuote = await createQuote(quoteWithoutId as QuoteSchema, services)

  return newQuote
}

export async function deleteQuote(quoteId: string) {
  const quotes = await getQuotes()
  const newQuotes = quotes.filter((quote: QuoteSchema) => quote.id !== quoteId)
  await Promise.all([
    AsyncStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(newQuotes)),
    deleteServices(quoteId),
  ])
}

export async function updateQuote(
  quote: QuoteSchema,
  services: ServiceSchema[]
) {
  const quotes = await getQuotes()
  const quoteIndex = quotes.findIndex((q: QuoteSchema) => q.id === quote.id)

  if (quoteIndex === -1) {
    throw new Error(`Quote with id ${quote.id} not found`)
  }

  // Atualiza apenas o quote encontrado e mantém updatedAt
  quotes[quoteIndex] = {
    ...quote,
    updatedAt: new Date(),
  }

  await Promise.all([
    AsyncStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(quotes)),
    saveServices(services, quote.id),
  ])

  return quotes[quoteIndex]
}
