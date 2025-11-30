import { TextInput, TextInputProps, View } from 'react-native'
import { styles } from './styles'

export function TextArea({ ...props }: TextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        textAlignVertical="top"
        {...props}
      />
    </View>
  )
}
