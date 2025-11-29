import { Button } from '@/components/Button'
import { FlatList, View } from 'react-native'
import { styles } from './styles'
import { CustomText } from '@/components/CustomText'
import { TextField } from '@/components/TextField'
import { Pencil, Plus, Search, SlidersHorizontal } from 'lucide-react-native'
import { Status } from '@/components/Status'
import { STATUS } from '@/types/status'
import { Card } from '@/components/Card'
import { COLORS } from '@/styles/colors'
import { Divider } from '@/components/Divider'
import { ButtonIcon } from '@/components/ButtonIcon'
import { formatCurrencyBRL } from '@/utils/formatCurrencyBRL'
import { DrawerRoutesProps } from '@/routes/DrawerRoutes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { Filter } from './components/Filter'

const quotes = [
  {
    id: '1',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
  {
    id: '2',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
  {
    id: '3',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
  {
    id: '4',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
  {
    id: '5',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },

  {
    id: '6',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
  {
    id: '7',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
  {
    id: '8',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
  {
    id: '9',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
  {
    id: '10',
    title: ' Desenvolvimento de aplicativo de loja online',
    description: 'Soluções Tecnológicas Beta',
    status: STATUS.APPROVED,
    price: 22300.0,
  },
]

type QuoteListProps = DrawerRoutesProps<'list'>

export function QuoteList({ navigation }: QuoteListProps) {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const openFilters = () => {
    bottomSheetRef.current?.expand()
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <CustomText variant="title" color="purple">
              Quotes
            </CustomText>
            <CustomText variant="body2" color="gray_500">
              You have 1 item in draft
            </CustomText>
          </View>

          <Button>
            <Plus color={COLORS.BASE_WHITE} />
            <CustomText variant="subTitle2" color="white">
              New
            </CustomText>
          </Button>
        </View>

        <Divider />

        <View style={styles.main}>
          <View style={styles.filter}>
            <TextField icon={<Search />} placeholder="Search for quotes..." />

            <ButtonIcon onPress={openFilters}>
              <SlidersHorizontal color={COLORS.BASE_PURPLE} />
            </ButtonIcon>
          </View>

          <FlatList
            data={quotes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 208, gap: 8 }}
            renderItem={({ item }) => (
              <Card styleChildren={styles.cardList}>
                <View style={styles.textContainer}>
                  <CustomText variant="subTitle1">{item.title}</CustomText>
                  <CustomText variant="body2" color="gray_600">
                    {item.description}
                  </CustomText>
                </View>

                <View style={styles.details}>
                  <Status status={item.status} />
                  <CustomText variant="subTitle1">
                    {formatCurrencyBRL(item.price)}
                  </CustomText>
                </View>
              </Card>
            )}
          />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['40%', '60%']}
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
        <BottomSheetView style={{ padding: 16 }}>
          <CustomText variant="title">Filtros</CustomText>
          <CustomText variant="body1" color="gray_600">
            Aqui você coloca os campos de filtro...
          </CustomText>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}
