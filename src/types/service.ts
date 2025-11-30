import { z } from 'zod'
import { schemaService } from '@/schemas/service'

export type ServiceSchema = z.infer<typeof schemaService>
