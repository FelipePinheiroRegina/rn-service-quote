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

interface FilterProps {
  onClose?: () => void
}

export function Filter({ onClose }: FilterProps) {
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

          <View style={styles.gap4}>
            <View style={styles.flexRow}>
              <Checkbox status="checked" color={COLORS.BASE_PURPLE} />
              <Status status={STATUS.DRAFT} />
            </View>
            <View style={styles.flexRow}>
              <Checkbox status="checked" color={COLORS.BASE_PURPLE} />
              <Status status={STATUS.SENT} />
            </View>
            <View style={styles.flexRow}>
              <Checkbox status="checked" color={COLORS.BASE_PURPLE} />
              <Status status={STATUS.APPROVED} />
            </View>
            <View style={styles.flexRow}>
              <Checkbox status="checked" color={COLORS.BASE_PURPLE} />
              <Status status={STATUS.REFUSED} />
            </View>
          </View>
        </View>

        <View>
          <CustomText
            variant="body3"
            color="gray_500"
            style={{ marginBottom: 12 }}
          >
            Order By
          </CustomText>

          <View style={styles.gap4}>
            <View style={styles.flexRow}>
              <RadioButton
                status="checked"
                color={COLORS.BASE_PURPLE}
                value="first"
              />
              <CustomText variant="body1">Mais recente</CustomText>
            </View>
            <View style={styles.flexRow}>
              <RadioButton
                status="checked"
                color={COLORS.BASE_PURPLE}
                value="first"
              />
              <CustomText variant="body1">Mais antigo</CustomText>
            </View>
            <View style={styles.flexRow}>
              <RadioButton
                status="checked"
                color={COLORS.BASE_PURPLE}
                value="first"
              />
              <CustomText variant="body1">Maior valor</CustomText>
            </View>
            <View style={styles.flexRow}>
              <RadioButton
                status="checked"
                color={COLORS.BASE_PURPLE}
                value="first"
              />
              <CustomText variant="body1">Menor valor</CustomText>
            </View>
          </View>
        </View>
      </View>

      <Divider style={{ marginBottom: 22, marginTop: 22 }} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>
        <Button variant="outlined">
          <CustomText variant="subTitle2" color="purple">
            Reset filters
          </CustomText>
        </Button>
        <Button>
          <Check color={COLORS.BASE_WHITE} />
          <CustomText variant="subTitle2" color="white">
            Apply
          </CustomText>
        </Button>
      </View>
    </BottomSheetView>
  )
}
