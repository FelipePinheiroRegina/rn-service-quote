import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 72,
    paddingBottom: 80,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  dividerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  main: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flex: 1,
    gap: 20,
  },

  infoColumn: {
    flexDirection: 'column',
    gap: 4,
  },

  datesRow: {
    flexDirection: 'row',
    gap: 16,
  },

  dateColumn: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})

