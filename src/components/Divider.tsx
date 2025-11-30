import { COLORS } from '@/styles/colors'
import { StyleSheet, View } from 'react-native'

export function Divider(props: View['props']) {
  return <View style={[styles.container, props.style]} />
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    backgroundColor: COLORS.GRAY_100,
  },
})
