import { QuoteList } from '@/app/QuoteList'
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer'
import { HomeIcon } from 'lucide-react-native'

export type DrawerRoutesList = {
  list: undefined
}

export type DrawerRoutesProps<T extends keyof DrawerRoutesList> =
  DrawerScreenProps<DrawerRoutesList, T>

const Drawer = createDrawerNavigator<DrawerRoutesList>()

export function DrawerRoutes() {
  return (
    <Drawer.Navigator
      id="drawer"
      initialRouteName="list"
      screenOptions={{
        headerShown: false,
        
      }}
    >
      <Drawer.Screen
        name="list"
        component={QuoteList}
        options={{
          drawerIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}
