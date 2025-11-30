import { ServiceSchema } from '@/types/service'

export const SERVICE_FORM_DEFAULT: ServiceSchema = {
  id: '',
  title: '',
  description: '',
  qtd: 1,
  totalInCents: 0,

  createdAt: new Date(),
  updatedAt: new Date(),
}
