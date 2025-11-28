import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './styles'
import { TextTheme } from '../Text'

export type ButtonVariant = 'primary' | 'outlined'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant: ButtonVariant
}

export function Button({ children, variant, ...props }: ButtonProps) {
  const defineColor = variant === 'primary' ? 'white' : 'purple'

  return (
    <TouchableOpacity style={[styles.default, styles[variant]]} {...props}>
      <TextTheme variant="subTitle2" color={defineColor}>
        {children}
      </TextTheme>
    </TouchableOpacity>
  )
}
