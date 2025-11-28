import { Text, TextProps } from 'react-native'
import { styles } from './styles'

export type ColorText =
  | 'purple'
  | 'white'
  | 'gray_500'
  | 'gray_600'
  | 'success_dark'
  | 'info_dark'
  | 'danger_dark'

export type VariantText =
  | 'title'
  | 'subTitle1'
  | 'subTitle2'
  | 'subTitle3'
  | 'body1'
  | 'body2'
  | 'body3'

interface TextThemeProps extends TextProps {
  children: React.ReactNode
  variant: VariantText
  color?: ColorText
}

export function TextTheme({ children, variant, color }: TextThemeProps) {
  return (
    <Text style={[styles[variant], color && styles[color]]}>{children}</Text>
  )
}
