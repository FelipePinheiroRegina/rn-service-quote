import { COLORS } from '@/styles/colors'
import { View } from 'react-native'

export function Divider() {
  return (
    <View
      style={{ borderBottomWidth: 0.2, backgroundColor: COLORS.GRAY_100 }}
    />
  )
}
