import { COLORS } from '@/styles/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    width: 84,

    paddingLeft: 8,
    paddingRight: 8,

    paddingTop: 4,
    paddingBlock: 4,
  },

  approvedBg: {
    backgroundColor: COLORS.SUCCESS_LIGHT,
  },

  sentBg: {
    backgroundColor: COLORS.INFO_LIGHT,
  },

  draftBg: {
    backgroundColor: COLORS.GRAY_300,
  },

  refusedBg: {
    backgroundColor: COLORS.DANGER_LIGHT,
  },

  point: {
    width: 8,
    height: 8,
    borderRadius: 9999,
  },

  pointApproved: {
    backgroundColor: COLORS.SUCCESS_BASE,
  },

  pointSent: {
    backgroundColor: COLORS.INFO_BASE,
  },

  pointDraft: {
    backgroundColor: COLORS.GRAY_400,
  },

  pointRefused: {
    backgroundColor: COLORS.DANGER_BASE,
  },
})
