import { COLORS } from '@/styles/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_300,
    width: '100%',
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 100,
  },

  input: {
    flex: 1,
    minHeight: 80,
  },
})
