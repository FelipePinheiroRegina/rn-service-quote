import { Text, TextInput, TextInputProps, View } from 'react-native'
import { styles } from './styles'
import { ReactElement, ReactNode } from 'react'

interface TextFieldProps extends TextInputProps {
  icon?: ReactElement
}

export function TextField({ icon, ...props }: TextFieldProps) {
  return (
    <View style={styles.container}>
      {icon && icon}
      <TextInput style={styles.input} {...props} />
    </View>
  )
}
