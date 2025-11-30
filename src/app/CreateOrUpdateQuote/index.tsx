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
import { useRef, useState } from 'react'
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

type CreateOrUpdateQuoteProps = StackRoutesProps<'createOrUpdate'>

export function CreateOrUpdateQuote({
  navigation,
  route,
}: CreateOrUpdateQuoteProps) {
  const isUpdate = Boolean(route.params?.id)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [serviceItems, setServiceItems] = useState<ServiceSchema[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteSchema>({
    resolver: zodResolver(schemaQuote),
    defaultValues: QUOTE_FORM_DEFAULT,
  })

  const methodsService = useForm<ServiceSchema>({
    resolver: zodResolver(schemaService),
    defaultValues: SERVICE_FORM_DEFAULT,
  })

  const onSubmit = (dataQuote: QuoteSchema, dataService: ServiceSchema) => {
    console.log(dataQuote)
    console.log(dataService)
  }

  const onSubmitService = (data: ServiceSchema) => {
    setServiceItems((state) => {
      const exists = state.some((item) => item.id === data.id)

      if (exists) {
        return state.map((item) =>
          item.id === data.id ? { ...item, ...data } : item
        )
      }

      return [{ ...data, id: generateId() }, ...state]
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
    methodsService.setValue('createdAt', createdAt)
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
                gap: 20,
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
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <CustomText variant="body3" color="gray_600">
                    8 items
                  </CustomText>
                  <CustomText variant="body2">
                    {formatCurrencyBRL(3847.5)}
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
                      width: 72,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingVertical: 4,
                    }}
                  >
                    <TextInput
                      style={{ flex: 1, fontSize: 14 }}
                      defaultValue="8"
                    />
                    <Percent size={18} />
                  </View>
                </View>

                <CustomText variant="body2" color="danger_dark">
                  - {formatCurrencyBRL(200)}
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
                      textDecorationLine: 'line-through',
                      color: COLORS.GRAY_500,
                    }}
                  >
                    {formatCurrencyBRL(4050)}
                  </CustomText>
                  <CustomText variant="title">
                    {formatCurrencyBRL(3847.5)}
                  </CustomText>
                </View>
              </View>
            </Card>
          </View>

          <Divider />

          <View style={styles.footerActions}>
            <Button
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
