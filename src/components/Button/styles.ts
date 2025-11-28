import { StyleSheet } from 'react-native'
import { COLORS } from '@/styles/colors'

export const styles = StyleSheet.create({
  default: {
    padding: 12,
    borderRadius: 999,

    justifyContent: 'center',
    alignItems: 'center',
  },

  primary: {
    backgroundColor: COLORS.BASE_PURPLE,
  },

  outlined: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_300,
    backgroundColor: COLORS.GRAY_100,
  },
})
