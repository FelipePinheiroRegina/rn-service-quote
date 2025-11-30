export function parseInCents(text: string) {
  const numbers = text.replace(/\D/g, '')

  if (!numbers) return 0

  return Number(numbers)
}
