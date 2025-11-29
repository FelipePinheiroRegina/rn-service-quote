import { View } from 'react-native'
import { CustomText } from '../CustomText'
import { formatCurrencyBRL } from '@/utils/formatCurrencyBRL'
import { styles } from './styles'
import { ReactNode } from 'react'
import { Button } from '../Button'

interface ServiceItemProps {
  title: string
  description: {
    text: string
    ellipsis?: boolean
  }
  price: number
  qtd: number
  withButton?: {
    icon: ReactNode
    onPress: VoidFunction
  }
}

export function ServiceItem({
  title,
  description,
  price,
  qtd,
  withButton,
}: ServiceItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.gap}>
        <CustomText variant="subTitle2">{title}</CustomText>
        <CustomText
          variant="body3"
          color="gray_500"
          style={styles.description}
          {...(description.ellipsis && {
            numberOfLines: 1,
            ellipsizeMode: 'tail',
          })}
        >
          {description.text}
        </CustomText>
      </View>

      <View style={styles.gap}>
        <CustomText variant="subTitle1">{formatCurrencyBRL(price)}</CustomText>
        <CustomText variant="body3" color="gray_600">
          {`Qt: ${qtd}`}
        </CustomText>
      </View>

      {withButton && (
        <Button variant="outlined" onPress={withButton.onPress}>
          {withButton.icon}
        </Button>
      )}
    </View>
  )
}
