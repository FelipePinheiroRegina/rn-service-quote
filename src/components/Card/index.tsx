import { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { styles } from './styles'
import { Divider } from '../Divider'

interface CardProps {
  children: ReactNode
  header?: ReactNode
  styleChildren?: StyleProp<ViewStyle>
}

export function Card({ children, header, styleChildren }: CardProps) {
  return (
    <View style={styles.container}>
      {header && <View style={styles.header}>{header}</View>}
      {header && <Divider />}
      <View style={[styles.children, styleChildren]}>{children}</View>
    </View>
  )
}
