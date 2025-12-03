import { ServiceSchema } from '@/types/service'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const SERVICE_STORAGE_KEY = '@rn-service-quote:quotes:{quoteId}:services'

export async function saveServices(services: ServiceSchema[], quoteId: string) {
  await AsyncStorage.setItem(
    SERVICE_STORAGE_KEY.replace('{quoteId}', quoteId),
    JSON.stringify(services)
  )
}

export async function getServices(quoteId: string): Promise<ServiceSchema[]> {
  const services = await AsyncStorage.getItem(
    SERVICE_STORAGE_KEY.replace('{quoteId}', quoteId)
  )
  return services ? JSON.parse(services) : []
}

export async function deleteServices(quoteId: string) {
  await AsyncStorage.removeItem(
    SERVICE_STORAGE_KEY.replace('{quoteId}', quoteId)
  )
}
