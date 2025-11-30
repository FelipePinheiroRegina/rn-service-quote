export function formatCurrencyBRL(value?: number) {
  if (!value) return 'R$ 0,00'

  return (value / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
