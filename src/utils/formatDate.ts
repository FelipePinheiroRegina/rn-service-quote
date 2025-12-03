import dayjs from '@/config/dayjs'

type FormatDateType = 'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm' | 'LL' | 'LLLL'

/**
 * Formata uma data de acordo com o formato especificado usando dayjs
 *
 * @param date - Data a ser formatada (Date ou string)
 * @param format - Formato desejado (padrão: 'DD/MM/YYYY')
 *
 * @example
 * // Retorna: "03/12/2025"
 * formatDate(new Date(), 'DD/MM/YYYY')
 *
 * @example
 * // Retorna: "03/12/2025 14:30"
 * formatDate(new Date(), 'DD/MM/YYYY HH:mm')
 *
 * @example
 * // Retorna: "3 de dezembro de 2025"
 * formatDate(new Date(), 'LL')
 *
 * @example
 * // Retorna: "terça-feira, 3 de dezembro de 2025 14:30"
 * formatDate(new Date(), 'LLLL')
 *
 * @returns String com a data formatada
 */
export function formatDate(
  date: Date | string,
  format: FormatDateType = 'DD/MM/YYYY'
): string {
  return dayjs(date).format(format)
}
