import { StyleSheet } from 'react-native'
import { COLORS } from '@/styles/colors'

export const styles = StyleSheet.create({
  default: {
    padding: 12,
    borderRadius: 999,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GRAY_300,
    backgroundColor: COLORS.GRAY_100,
  },

  center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
})
