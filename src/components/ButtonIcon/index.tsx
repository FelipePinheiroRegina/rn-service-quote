import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { styles } from './styles'

interface ButtonIconProps extends TouchableOpacityProps {
  children: React.ReactNode
}

export function ButtonIcon({ children, ...props }: ButtonIconProps) {
  return (
    <TouchableOpacity {...props} style={[props.style, styles.default]}>
      <View style={styles.center}>{children}</View>
    </TouchableOpacity>
  )
}
