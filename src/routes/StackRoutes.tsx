import { CreateOrUpdateQuote } from '@/app/CreateOrUpdateQuote'
import { DetailsQuote } from '@/app/DetailsQuote'
import { QuoteList } from '@/app/QuoteList'

import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

export type StackRoutesList = {
  list: undefined
  createOrUpdate: { id?: string }
  details: { id: string }
}

export type StackRoutesProps<T extends keyof StackRoutesList> =
  StackScreenProps<StackRoutesList, T>

const Stack = createStackNavigator<StackRoutesList>()

export function StackRoutes() {
  return (
    <Stack.Navigator
      id="stack"
      initialRouteName="list"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="list" component={QuoteList} />
      <Stack.Screen name="createOrUpdate" component={CreateOrUpdateQuote} />
      <Stack.Screen name="details" component={DetailsQuote} />
    </Stack.Navigator>
  )
}
