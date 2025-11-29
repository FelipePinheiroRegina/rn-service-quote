import { COLORS } from '@/styles/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAY_100,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    borderRadius: 10,
  },

  header: {
    padding: 16,
  },

  children: {
    padding: 16,
  },
})
