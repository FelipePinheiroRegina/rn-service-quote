import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  gap: {
    gap: 3,
    flex: 1,
  },

  gapRight: {
    gap: 3,
    alignItems: 'flex-end',
  },

  description: {
    maxWidth: 200,
  },
})
