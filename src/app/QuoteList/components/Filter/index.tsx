import { CustomText } from '@/components/CustomText'
import { Divider } from '@/components/Divider'
import { Status } from '@/components/Status'
import { COLORS } from '@/styles/colors'
import { STATUS } from '@/types/status'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { Check, X } from 'lucide-react-native'
import { TouchableOpacity, View } from 'react-native'
import { Checkbox, RadioButton } from 'react-native-paper'
import { styles } from './styles'
import { Button } from '@/components/Button'
import { FilterQuoteListSchema } from '@/types/filterQuoteList'
import { Controller, useFormContext } from 'react-hook-form'
import { ORDER_BY } from '@/types/orderBy'

interface FilterProps {
  onClose: VoidFunction
  onApplyFilters: (data: FilterQuoteListSchema) => void
  onResetFilters: VoidFunction
}

export function Filter({
  onClose,
  onApplyFilters,
  onResetFilters,
}: FilterProps) {
  const { control, handleSubmit } = useFormContext<FilterQuoteListSchema>()

  const toggleStatus = (status: STATUS, currentStatuses: STATUS[]) => {
    if (currentStatuses.includes(status)) {
      return currentStatuses.filter((s) => s !== status)
    }
    return [...currentStatuses, status]
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
        <CustomText variant="subTitle2">Filter and order by</CustomText>
        <TouchableOpacity onPress={onClose}>
          <X />
        </TouchableOpacity>
      </View>

      <Divider style={{ marginBottom: 22, marginTop: 22 }} />

      <View style={{ paddingLeft: 16, paddingRight: 16, gap: 24 }}>
        <View>
          <CustomText
            variant="body3"
            color="gray_500"
            style={{ marginBottom: 12 }}
          >
            Status
          </CustomText>

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <View style={styles.gap4}>
                <TouchableOpacity
                  style={styles.flexRow}
                  onPress={() =>
                    field.onChange(toggleStatus(STATUS.DRAFT, field.value))
                  }
                >
                  <Checkbox
                    status={
                      field.value.includes(STATUS.DRAFT)
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={COLORS.BASE_PURPLE}
                  />
                  <Status status={STATUS.DRAFT} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.flexRow}
                  onPress={() =>
                    field.onChange(toggleStatus(STATUS.SENT, field.value))
                  }
                >
                  <Checkbox
                    status={
                      field.value.includes(STATUS.SENT)
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={COLORS.BASE_PURPLE}
                  />
                  <Status status={STATUS.SENT} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.flexRow}
                  onPress={() =>
                    field.onChange(toggleStatus(STATUS.APPROVED, field.value))
                  }
                >
                  <Checkbox
                    status={
                      field.value.includes(STATUS.APPROVED)
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={COLORS.BASE_PURPLE}
                  />
                  <Status status={STATUS.APPROVED} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.flexRow}
                  onPress={() =>
                    field.onChange(toggleStatus(STATUS.REFUSED, field.value))
                  }
                >
                  <Checkbox
                    status={
                      field.value.includes(STATUS.REFUSED)
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={COLORS.BASE_PURPLE}
                  />
                  <Status status={STATUS.REFUSED} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View>
          <CustomText
            variant="body3"
            color="gray_500"
            style={{ marginBottom: 12 }}
          >
            Order By
          </CustomText>

          <Controller
            control={control}
            name="orderBy"
            render={({ field }) => (
              <RadioButton.Group
                value={field.value}
                onValueChange={field.onChange}
              >
                <View style={styles.gap4}>
                  <View style={styles.flexRow}>
                    <RadioButton
                      color={COLORS.BASE_PURPLE}
                      value={ORDER_BY.MOST_RECENT}
                    />
                    <CustomText variant="body1">Mais recente</CustomText>
                  </View>
                  <View style={styles.flexRow}>
                    <RadioButton
                      color={COLORS.BASE_PURPLE}
                      value={ORDER_BY.OLDEST}
                    />
                    <CustomText variant="body1">Mais antigo</CustomText>
                  </View>
                  <View style={styles.flexRow}>
                    <RadioButton
                      color={COLORS.BASE_PURPLE}
                      value={ORDER_BY.HIGHEST}
                    />
                    <CustomText variant="body1">Maior valor</CustomText>
                  </View>
                  <View style={styles.flexRow}>
                    <RadioButton
                      color={COLORS.BASE_PURPLE}
                      value={ORDER_BY.LOWEST}
                    />
                    <CustomText variant="body1">Menor valor</CustomText>
                  </View>
                </View>
              </RadioButton.Group>
            )}
          />
        </View>
      </View>

      <Divider style={{ marginBottom: 22, marginTop: 22 }} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>
        <Button variant="outlined" onPress={onResetFilters}>
          <CustomText variant="subTitle2" color="purple">
            Reset filters
          </CustomText>
        </Button>
        <Button onPress={handleSubmit(onApplyFilters)}>
          <Check color={COLORS.BASE_WHITE} />
          <CustomText variant="subTitle2" color="white">
            Apply
          </CustomText>
        </Button>
      </View>
    </BottomSheetView>
  )
}
