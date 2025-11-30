import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 72,
    gap: 32,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },

  main: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },

  filter: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },

  cardList: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    maxHeight: 124,
  },

  textContainer: {
    maxWidth: 200,
    gap: 8,
  },

  details: {
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  // BOTTOM SHEET

  containerBottomSheet: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainerBottomSheet: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
})
