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
import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { QuoteSchema } from '@/types/quote'
import { copyQuote, deleteQuote, getQuotes } from '@/storage/quoteStorage'
import { formatDate } from '@/utils/formatDate'
import { ServiceSchema } from '@/types/service'
import { getServices } from '@/storage/serviceStorage'

type DetailsQuoteProps = StackRoutesProps<'details'>

export function DetailsQuote({ navigation, route }: DetailsQuoteProps) {
  const quoteId = route.params?.id
  const [quote, setQuote] = useState<QuoteSchema | null>(null)
  const [services, setServices] = useState<ServiceSchema[]>([])

  const handleCopyQuote = async () => {
    await copyQuote(quoteId)
    navigation.goBack()
  }

  const handleDeleteQuote = async () => {
    await deleteQuote(quoteId)
    navigation.goBack()
  }

  const fetchQuote = async () => {
    const [quote, services] = await Promise.all([
      getQuotes(),
      getServices(quoteId),
    ])
    const quoteFound = quote.find((q: QuoteSchema) => q.id === quoteId)
    setQuote(quoteFound)
    setServices(services)
  }

  useFocusEffect(
    useCallback(() => {
      if (quoteId) {
        fetchQuote()
      }
    }, [quoteId])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={32} />
          </TouchableOpacity>
          <CustomText variant="subTitle2">Quote #{quoteId}</CustomText>
        </View>
        <Status status={quote?.status} />
      </View>

      <View style={styles.dividerContainer}>
        <Divider />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View style={styles.main}>
          <Card
            styleChildren={{ gap: 16 }}
            header={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
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
                    flexShrink: 0,
                  }}
                >
                  <ShoppingCart size={20} color={COLORS.BASE_PURPLE} />
                </View>
                <CustomText variant="title" style={{ flex: 1, flexShrink: 1 }}>
                  {quote?.title}
                </CustomText>
              </View>
            }
          >
            <View style={styles.infoColumn}>
              <CustomText variant="body3" color="gray_500">
                Client
              </CustomText>
              <CustomText variant="body2">{quote?.client}</CustomText>
            </View>

            <View style={styles.datesRow}>
              <View style={styles.dateColumn}>
                <CustomText variant="body3" color="gray_500">
                  Created on
                </CustomText>
                <CustomText variant="body2">
                  {formatDate(quote?.createdAt)}
                </CustomText>
              </View>
              <View style={styles.dateColumn}>
                <CustomText variant="body3" color="gray_500">
                  Updated on
                </CustomText>
                <CustomText variant="body2">
                  {formatDate(quote?.updatedAt)}
                </CustomText>
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
                description={{ text: service.description }}
                totalInCents={service.totalInCents}
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
                    style={{
                      textDecorationLine:
                        quote?.discount.percentage > 0
                          ? 'line-through'
                          : 'none',
                    }}
                  >
                    {formatCurrencyBRL(quote?.subtotalInCents)}
                  </CustomText>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
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
                        {quote?.discount.percentage}% off
                      </CustomText>
                    </View>
                  </View>
                  <CustomText variant="subTitle3" color="success_dark">
                    - {formatCurrencyBRL(quote?.discount.amountInCents)}
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
                {formatCurrencyBRL(quote?.totalInCents)}
              </CustomText>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerActions}>
          <ButtonIcon onPress={handleDeleteQuote}>
            <Trash2 size={20} color={COLORS.DANGER_BASE} />
          </ButtonIcon>
          <ButtonIcon onPress={handleCopyQuote}>
            <Copy size={20} color={COLORS.BASE_PURPLE} />
          </ButtonIcon>
          <ButtonIcon
            onPress={() =>
              navigation.navigate('createOrUpdate', { id: quoteId })
            }
          >
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
