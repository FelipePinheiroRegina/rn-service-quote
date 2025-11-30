import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 72,
    gap: 32,
    paddingBottom: 64,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },

  main: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    gap: 20,
  },

  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
})
