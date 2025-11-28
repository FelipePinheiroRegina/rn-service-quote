import { COLORS } from '@/styles/colors'
import { SIZES } from '@/styles/sizes'
import { WEIGHTS } from '@/styles/weights'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // VARIANTS
  title: {
    fontSize: SIZES.FONT_LG,
    fontWeight: WEIGHTS.FONT_BOLD,
  },

  subTitle1: {
    fontSize: SIZES.FONT_MD,
    fontWeight: WEIGHTS.FONT_BOLD,
  },

  subTitle2: {
    fontSize: SIZES.FONT_SM,
    fontWeight: WEIGHTS.FONT_BOLD,
  },

  subTitle3: {
    fontSize: SIZES.FONT_XS,
    fontWeight: WEIGHTS.FONT_BOLD,
  },

  body1: {
    fontSize: SIZES.FONT_MD,
  },

  body2: {
    fontSize: SIZES.FONT_SM,
  },

  body3: {
    fontSize: SIZES.FONT_XS,
  },

  // COLORS
  purple: {
    color: COLORS.BASE_PURPLE,
  },

  white: {
    color: COLORS.BASE_WHITE,
  },

  gray_500: {
    color: COLORS.GRAY_500,
  },

  gray_600: {
    color: COLORS.GRAY_600,
  },

  success_dark: {
    color: COLORS.SUCCESS_DARK,
  },

  info_dark: {
    color: COLORS.INFO_DARK,
  },

  danger_dark: {
    color: COLORS.DANGER_DARK,
  },
})
