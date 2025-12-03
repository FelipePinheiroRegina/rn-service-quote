import { CustomText } from '@/components/CustomText'
import { StackRoutesProps } from '@/routes/StackRoutes'
import {
  Check,
  ChevronLeft,
  CreditCard,
  Pencil,
  Percent,
  Plus,
  ScrollText,
  Store,
  Tag,
} from 'lucide-react-native'
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './styles'
import { Divider } from '@/components/Divider'
import { Card } from '@/components/Card'
import { TextField } from '@/components/TextField'
import { COLORS } from '@/styles/colors'
import { RadioButton } from 'react-native-paper'
import { Status } from '@/components/Status'
import { STATUS } from '@/types/status'
import { ServiceItem } from '@/components/ServiceItem'
import { Button } from '@/components/Button'
import { formatCurrencyBRL } from '@/utils/formatCurrencyBRL'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import { ServiceForm } from './components/ServiceForm'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { QuoteSchema } from '@/types/quote'
import { schemaQuote } from '@/schemas/quote'
import { QUOTE_FORM_DEFAULT } from '@/constants/quote'
import { ServiceSchema } from '@/types/service'
import { schemaService } from '@/schemas/service'
import { SERVICE_FORM_DEFAULT } from '@/constants/service'
import { generateId } from '@/utils/generateId'
import { createQuote, getQuotes, updateQuote } from '@/storage/quoteStorage'
import { getServices } from '@/storage/serviceStorage'

type CreateOrUpdateQuoteProps = StackRoutesProps<'createOrUpdate'>

export function CreateOrUpdateQuote({
  navigation,
  route,
}: CreateOrUpdateQuoteProps) {
  const quoteId = route.params?.id
  console.log(quoteId)
  const isUpdate = Boolean(quoteId)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [serviceItems, setServiceItems] = useState<ServiceSchema[]>([])

  const qtdItems = serviceItems.reduce((acc, item) => acc + item.qtd, 0)
  const subtotalInCents = serviceItems.reduce(
    (acc, item) => acc + item.totalInCents * item.qtd,
    0
  )

  const {
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteSchema>({
    resolver: zodResolver(schemaQuote),
    defaultValues: QUOTE_FORM_DEFAULT,
  })

  const discountInPercentage = watch('discount.percentage')
  const discountInAmountInCents = watch('discount.amountInCents')
  const totalInCentsWithDiscount = subtotalInCents - discountInAmountInCents

  // Sincronizar desconto baseado na porcentagem
  useEffect(() => {
    if (discountInPercentage) {
      const discountInCents = Math.round(
        (subtotalInCents * discountInPercentage) / 100
      )
      setValue('discount.amountInCents', discountInCents)
    } else {
      setValue('discount.amountInCents', 0)
    }
  }, [discountInPercentage, subtotalInCents, setValue])

  // Sincronizar subtotal e total com o formulário
  useEffect(() => {
    setValue('subtotalInCents', subtotalInCents)
    setValue('totalInCents', totalInCentsWithDiscount)
  }, [subtotalInCents, totalInCentsWithDiscount, setValue])

  const methodsService = useForm<ServiceSchema>({
    resolver: zodResolver(schemaService),
    defaultValues: SERVICE_FORM_DEFAULT,
  })

  const onSubmit = async (dataQuote: QuoteSchema) => {
    console.log(dataQuote)
    isUpdate
      ? await updateQuote(dataQuote, serviceItems)
      : await createQuote(dataQuote, serviceItems)
    navigation.goBack()
  }

  const handleCancelForm = () => {
    navigation.goBack()
    reset(QUOTE_FORM_DEFAULT)
    setServiceItems([])
    methodsService.reset(SERVICE_FORM_DEFAULT)
  }

  const onSubmitService = (data: ServiceSchema) => {
    console.log(data)
    setServiceItems((state) => {
      // Se tem ID válido (não vazio), é uma edição
      const exists = data.id && state.some((item) => item.id === data.id)

      if (exists) {
        return state.map((item) =>
          item.id === data.id ? { ...item, ...data } : item
        )
      }

      // Novo serviço: gera ID único e adiciona createdAt/updatedAt
      const newService: ServiceSchema = {
        ...data,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return [newService, ...state]
    })

    bottomSheetRef.current.close()
    methodsService.reset(SERVICE_FORM_DEFAULT)
  }

  const handleOpenServiceFormToUpdate = (serviceId: string) => {
    const { id, title, description, qtd, totalInCents, createdAt } =
      serviceItems.find((service) => service.id === serviceId)
    methodsService.setValue('id', id)
    methodsService.setValue('title', title)
    methodsService.setValue('description', description)
    methodsService.setValue('qtd', qtd)
    methodsService.setValue('totalInCents', totalInCents)
    methodsService.setValue('createdAt', new Date(createdAt))
    methodsService.setValue('updatedAt', new Date())

    bottomSheetRef.current.expand()
  }

  const handleRemoveService = (serviceId: string) => {
    const serviceItemsFiltered = serviceItems.filter(
      (service) => service.id !== serviceId
    )

    setServiceItems(serviceItemsFiltered)

    bottomSheetRef.current.close()
    methodsService.reset(SERVICE_FORM_DEFAULT)
  }

  const openServiceForm = () => {
    bottomSheetRef.current?.expand()
  }

  const fetchQuote = async () => {
    const quotes = await getQuotes()
    const quote = quotes.find((quote: QuoteSchema) => quote.id === quoteId)
    const services = await getServices(quoteId)

    reset({
      ...quote,
      createdAt: new Date(quote.createdAt),
      updatedAt: new Date(quote.updatedAt),
    })
    setServiceItems(services)
  }

  useEffect(() => {
    if (quoteId) {
      fetchQuote()
    }
  }, [quoteId])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft size={32} />
            </TouchableOpacity>
            <CustomText variant="subTitle2">
              Quote - {isUpdate ? 'Update' : 'New'}
            </CustomText>
          </View>

          <Divider />

          <View style={styles.main}>
            <Card
              styleChildren={{ gap: 12 }}
              header={
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <Store size={16} color={COLORS.BASE_PURPLE} />
                  <CustomText variant="body3" color="gray_500">
                    Details
                  </CustomText>
                </View>
              }
            >
              <View>
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <TextField
                      placeholder="Title"
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                {errors.title && (
                  <CustomText
                    variant="body3"
                    color="danger_dark"
                    style={{ marginTop: 4 }}
                  >
                    {errors.title.message}
                  </CustomText>
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  name="client"
                  render={({ field }) => (
                    <TextField
                      placeholder="Client"
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                {errors.client && (
                  <CustomText
                    variant="body3"
                    color="danger_dark"
                    style={{ marginTop: 4 }}
                  >
                    {errors.client.message}
                  </CustomText>
                )}
              </View>
            </Card>

            <Card
              header={
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <Tag size={16} color={COLORS.BASE_PURPLE} />
                  <CustomText variant="body3" color="gray_500">
                    Status
                  </CustomText>
                </View>
              }
            >
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <RadioButton.Group
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <View
                      style={{ gap: 12, flexDirection: 'row', columnGap: 24 }}
                    >
                      <View>
                        <View style={styles.statusItem}>
                          <RadioButton value={STATUS.DRAFT} />
                          <Status status={STATUS.DRAFT} />
                        </View>
                        <View style={styles.statusItem}>
                          <RadioButton value={STATUS.SENT} />
                          <Status status={STATUS.SENT} />
                        </View>
                      </View>

                      <View>
                        <View style={styles.statusItem}>
                          <RadioButton value={STATUS.APPROVED} />
                          <Status status={STATUS.APPROVED} />
                        </View>
                        <View style={styles.statusItem}>
                          <RadioButton value={STATUS.REFUSED} />
                          <Status status={STATUS.REFUSED} />
                        </View>
                      </View>
                    </View>
                  </RadioButton.Group>
                )}
              />
            </Card>

            <Card
              styleChildren={{ gap: 20 }}
              header={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <ScrollText size={16} color={COLORS.BASE_PURPLE} />
                  <CustomText variant="body3" color="gray_500">
                    Services included
                  </CustomText>
                </View>
              }
            >
              {serviceItems.map((service) => (
                <ServiceItem
                  key={service.id}
                  title={service.title}
                  description={{
                    text: service.description,
                    ellipsis: true,
                  }}
                  totalInCents={service.totalInCents}
                  qtd={service.qtd}
                  withButton={{
                    icon: <Pencil color={COLORS.BASE_PURPLE} size={20} />,
                    onPress: () => handleOpenServiceFormToUpdate(service.id),
                  }}
                />
              ))}

              <Button variant="outlined" onPress={openServiceForm}>
                <Plus size={24} color={COLORS.BASE_PURPLE} />
                <CustomText variant="subTitle2" color="purple">
                  Add service
                </CustomText>
              </Button>
            </Card>

            <Card
              styleChildren={{
                gap: 8,
              }}
              header={
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <CreditCard size={16} color={COLORS.BASE_PURPLE} />
                  <CustomText variant="body3" color="gray_500">
                    Investment
                  </CustomText>
                </View>
              }
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <CustomText variant="body2">Subtotal</CustomText>
                <View
                  style={{
                    gap: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <CustomText variant="body3" color="gray_600">
                    {qtdItems} items
                  </CustomText>
                  <CustomText variant="body2">
                    {formatCurrencyBRL(subtotalInCents)}
                  </CustomText>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <CustomText variant="body2">Discount</CustomText>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: COLORS.GRAY_300,
                      backgroundColor: COLORS.GRAY_100,
                      borderRadius: 999,
                      width: 96,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingVertical: 4,
                    }}
                  >
                    <Controller
                      control={control}
                      name="discount.percentage"
                      render={({ field }) => (
                        <TextInput
                          style={{ flex: 1, fontSize: 14 }}
                          defaultValue="0"
                          value={field.value.toString()}
                          onChangeText={(text) => field.onChange(Number(text))}
                          onBlur={() => {
                            field.onBlur()
                            if (!field.value) {
                              setValue('discount.percentage', 0)
                            }
                          }}
                          keyboardType="numeric"
                          maxLength={3}
                          inputMode="numeric"
                        />
                      )}
                    />
                    <Percent size={18} />
                  </View>
                </View>

                <CustomText variant="body2" color="danger_dark">
                  - {formatCurrencyBRL(discountInAmountInCents)}
                </CustomText>
              </View>

              <Divider />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <CustomText variant="subTitle2">Total value</CustomText>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <CustomText
                    variant="body2"
                    style={{
                      textDecorationLine:
                        discountInPercentage > 0 ? 'line-through' : 'none',
                      color: COLORS.GRAY_500,
                    }}
                  >
                    {formatCurrencyBRL(subtotalInCents)}
                  </CustomText>
                  <CustomText variant="title">
                    {formatCurrencyBRL(totalInCentsWithDiscount)}
                  </CustomText>
                </View>
              </View>
            </Card>
          </View>

          <Divider />

          <View style={styles.footerActions}>
            <Button
              onPress={handleCancelForm}
              variant="outlined"
              style={{
                flex: 1,
                backgroundColor: COLORS.BASE_WHITE,
                borderColor: COLORS.BASE_PURPLE,
              }}
            >
              <CustomText variant="subTitle2" color="purple">
                Cancel
              </CustomText>
            </Button>
            <Button
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              style={{
                flex: 1,
              }}
            >
              <Check size={20} color={COLORS.BASE_WHITE} />
              <CustomText variant="subTitle2" color="white">
                Save
              </CustomText>
            </Button>
          </View>
        </View>
      </ScrollView>
      <FormProvider {...methodsService}>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['40%', '55%']}
          enablePanDownToClose
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              opacity={0.6}
            />
          )}
        >
          <ServiceForm
            onClose={() => bottomSheetRef.current?.close()}
            onRemove={(serviceId) => handleRemoveService(serviceId)}
            onSubmit={onSubmitService}
          />
        </BottomSheet>
      </FormProvider>
    </GestureHandlerRootView>
  )
}
