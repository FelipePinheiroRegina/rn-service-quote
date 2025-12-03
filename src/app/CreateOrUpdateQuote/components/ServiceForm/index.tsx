import { CustomText } from '@/components/CustomText'
import { TextArea } from '@/components/TextArea'
import { TextField } from '@/components/TextField'
import { COLORS } from '@/styles/colors'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { Check, Minus, Plus, Trash2, X } from 'lucide-react-native'
import { TouchableOpacity, View } from 'react-native'
import { Button } from '@/components/Button'
import { ButtonIcon } from '@/components/ButtonIcon'
import { Divider } from '@/components/Divider'
import { formatCurrencyBRL } from '@/utils/formatCurrencyBRL'
import { ServiceSchema } from '@/types/service'
import { Controller, useFormContext } from 'react-hook-form'
import { parseInCents } from '@/utils/parseInCents'

interface ServiceFormProps {
  onClose?: () => void
  onSubmit: (data: ServiceSchema) => void
  onRemove: (serviceId: string) => void
}

export function ServiceForm({ onClose, onSubmit, onRemove }: ServiceFormProps) {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ServiceSchema>()

  const qtd = watch('qtd')
  const id = watch('id')

  const handleDecrease = () => {
    if (qtd > 1) {
      setValue('qtd', qtd - 1)
    }
  }

  const handleIncrease = () => {
    setValue('qtd', qtd + 1)
  }

  return (
    <BottomSheetView>
      <View
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomText variant="subTitle2">Service</CustomText>
        <TouchableOpacity onPress={onClose}>
          <X size={24} />
        </TouchableOpacity>
      </View>

      <Divider style={{ marginTop: 16, marginBottom: 24 }} />

      <View style={{ paddingLeft: 16, paddingRight: 16, gap: 16 }}>
        <View>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                placeholder="Design de interfaces..."
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
            name="description"
            render={({ field }) => (
              <TextArea
                placeholder="your description... max: 255"
                numberOfLines={4}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.description && (
            <CustomText
              variant="body3"
              color="danger_dark"
              style={{ marginTop: 4 }}
            >
              {errors.description.message}
            </CustomText>
          )}
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                name="totalInCents"
                render={({ field }) => (
                  <TextField
                    value={formatCurrencyBRL(field.value)}
                    onChangeText={(value) => {
                      const cents = parseInCents(value)
                      field.onChange(cents)
                    }}
                  />
                )}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                borderWidth: 1,
                borderColor: COLORS.GRAY_300,
                backgroundColor: COLORS.GRAY_100,
                borderRadius: 999,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
                minWidth: 48,
              }}
            >
              <TouchableOpacity
                onPress={handleDecrease}
                disabled={qtd === 1}
                style={{
                  opacity: qtd === 1 ? 0.3 : 1,
                }}
              >
                <Minus size={20} color={COLORS.BASE_PURPLE} />
              </TouchableOpacity>
              <CustomText variant="body2">{qtd}</CustomText>
              <TouchableOpacity onPress={handleIncrease}>
                <Plus size={20} color={COLORS.BASE_PURPLE} />
              </TouchableOpacity>
            </View>
          </View>
          {errors.totalInCents && (
            <CustomText
              variant="body3"
              color="danger_dark"
              style={{ marginTop: 4 }}
            >
              {errors.totalInCents.message}
            </CustomText>
          )}
        </View>
      </View>

      <Divider style={{ marginTop: 32, marginBottom: 16 }} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 16,
        }}
      >
        <ButtonIcon onPress={() => onRemove(id)} disabled={id === ''}>
          <Trash2 size={20} color={COLORS.DANGER_BASE} />
        </ButtonIcon>

        <Button
          variant="primary"
          style={{
            maxWidth: 100,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Check size={20} color={COLORS.BASE_WHITE} />
          <CustomText variant="subTitle2" color="white">
            Save
          </CustomText>
        </Button>
      </View>
    </BottomSheetView>
  )
}
