import { COLORS } from '@/styles/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: COLORS.GRAY_100,

    borderRadius: 999,
    flex: 1,
  },

  input: {
    flex: 1,
  },
})
