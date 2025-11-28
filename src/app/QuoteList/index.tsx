import { Button } from '@/components/Button'
import { View } from 'react-native'
import { styles } from './styles'

export function QuoteList() {
  return (
    <View style={styles.container}>
      <Button variant="outlined">Create</Button>
    </View>
  )
}
