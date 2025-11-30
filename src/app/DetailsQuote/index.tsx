import { CustomText } from '@/components/CustomText'
import { StackRoutesProps } from '@/routes/StackRoutes'
import {
  ChevronLeft,
  CreditCard,
  Copy,
  Edit,
  ScrollText,
  Send,
  ShoppingCart,
  Trash2,
} from 'lucide-react-native'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { Divider } from '@/components/Divider'
import { Card } from '@/components/Card'
import { COLORS } from '@/styles/colors'
import { Status } from '@/components/Status'
import { STATUS } from '@/types/status'
import { ServiceItem } from '@/components/ServiceItem'
import { Button } from '@/components/Button'
import { formatCurrencyBRL } from '@/utils/formatCurrencyBRL'
import { ButtonIcon } from '@/components/ButtonIcon'

type DetailsQuoteProps = StackRoutesProps<'details'>

const services = [
  {
    id: '1',
    title: 'Design de interfaces',
    description: {
      text: 'Criação de wireframes e protótipos de alta fidelidade',
      ellipsis: false,
    },
    price: 3847.5,
    qtd: 1,
  },
  {
    id: '2',
    title: 'Desenvolvimento front-end',
    description: {
      text: 'Criação de interfaces de usuário interativas',
      ellipsis: false,
    },
    price: 3847.5,
    qtd: 1,
  },
  {
    id: '3',
    title: 'Desenvolvimento back-end',
    description: {
      text: 'Implementação de servidor, banco de dados e APIs',
      ellipsis: false,
    },
    price: 3847.5,
    qtd: 1,
  },
  {
    id: '4',
    title: 'Implantação e suporte',
    description: {
      text: 'Publicação nas lojas de aplicativos e suporte técnico',
      ellipsis: false,
    },
    price: 3847.5,
    qtd: 1,
  },
]

export function DetailsQuote({ navigation, route }: DetailsQuoteProps) {
  const quoteId = route.params?.id || '12345'

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={32} />
          </TouchableOpacity>
          <CustomText variant="subTitle2">Quote #{quoteId}</CustomText>
        </View>
        <Status status={STATUS.SENT} />
      </View>

      <View style={styles.dividerContainer}>
        <Divider />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <View style={styles.main}>
          <Card
            styleChildren={{ gap: 16 }}
            header={
              <View
                style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: COLORS.PURPLE_LIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ShoppingCart size={20} color={COLORS.BASE_PURPLE} />
                </View>
                <CustomText
                  variant="title"
                  style={{ flex: 1, flexShrink: 1 }}
                >
                  Desenvolvimento de aplicativo de loja online
                </CustomText>
              </View>
            }
          >
            <View style={styles.infoColumn}>
              <CustomText variant="body3" color="gray_500">
                Client
              </CustomText>
              <CustomText variant="body2">Soluções Tecnológicas Beta</CustomText>
            </View>

            <View style={styles.datesRow}>
              <View style={styles.dateColumn}>
                <CustomText variant="body3" color="gray_500">
                  Created on
                </CustomText>
                <CustomText variant="body2">22/08/2024</CustomText>
              </View>
              <View style={styles.dateColumn}>
                <CustomText variant="body3" color="gray_500">
                  Updated on
                </CustomText>
                <CustomText variant="body2">25/08/2024</CustomText>
              </View>
            </View>
          </Card>

          <Card
            styleChildren={{ gap: 20 }}
            header={
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <ScrollText size={16} color={COLORS.BASE_PURPLE} />
                <CustomText variant="body3" color="gray_500">
                  Services included
                </CustomText>
              </View>
            }
          >
            {services.map((service) => (
              <ServiceItem
                key={service.id}
                title={service.title}
                description={service.description}
                price={service.price}
                qtd={service.qtd}
              />
            ))}
          </Card>

          <Card
            styleChildren={{
              gap: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: COLORS.PURPLE_LIGHT,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CreditCard size={20} color={COLORS.BASE_PURPLE} />
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CustomText variant="body2">Subtotal</CustomText>
                  <CustomText
                    variant="subTitle3"
                    style={{ textDecorationLine: 'line-through' }}
                  >
                    {formatCurrencyBRL(4050)}
                  </CustomText>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <CustomText variant="body2">Discount</CustomText>
                    <View
                      style={{
                        backgroundColor: COLORS.SUCCESS_LIGHT,
                        borderRadius: 999,
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                    >
                      <CustomText variant="body3" color="success_dark">
                        5% off
                      </CustomText>
                    </View>
                  </View>
                  <CustomText variant="subTitle3" color="success_dark">
                    - {formatCurrencyBRL(200)}
                  </CustomText>
                </View>
              </View>
            </View>

            <Divider />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <CustomText variant="subTitle2">Total investment</CustomText>
              <CustomText variant="title">
                {formatCurrencyBRL(3847.5)}
              </CustomText>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerActions}>
          <ButtonIcon>
            <Trash2 size={20} color={COLORS.DANGER_BASE} />
          </ButtonIcon>
          <ButtonIcon>
            <Copy size={20} color={COLORS.BASE_PURPLE} />
          </ButtonIcon>
          <ButtonIcon>
            <Edit size={20} color={COLORS.BASE_PURPLE} />
          </ButtonIcon>
        </View>

        <Button
          variant="primary"
          style={{
            flex: 1,
            maxWidth: 200,
          }}
          onPress={() => {
            // Handle share
          }}
        >
          <Send size={20} color={COLORS.BASE_WHITE} />
          <CustomText variant="subTitle2" color="white">
            Share
          </CustomText>
        </Button>
      </View>
    </View>
  )
}

