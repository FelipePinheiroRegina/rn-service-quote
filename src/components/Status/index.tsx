import { View } from 'react-native'
import { styles } from './styles'
import { CustomText } from '../CustomText'
import { STATUS } from '@/types/status'
import { defineBg, definePoint, defineText } from './utils'

interface StatusProps {
  status: STATUS
}

export function Status({ status }: StatusProps) {
  const colorBg = defineBg(status)
  const colorPoint = definePoint(status)
  const colorText = defineText(status)

  return (
    <View style={[styles.container, styles[colorBg]]}>
      <View style={[styles.point, styles[colorPoint]]} />
      <CustomText variant="subTitle3" color={colorText}>
        Aprovado
      </CustomText>
    </View>
  )
}
