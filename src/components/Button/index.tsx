import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { styles } from './styles'

export type ButtonVariant = 'primary' | 'outlined'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: ButtonVariant
}

export function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[props.style, styles.default, styles[variant]]}
    >
      <View style={styles.center}>{children}</View>
    </TouchableOpacity>
  )
}
