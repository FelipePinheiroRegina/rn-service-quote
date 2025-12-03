import { Button } from '@/components/Button'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { CustomText } from '@/components/CustomText'
import { TextField } from '@/components/TextField'
import {
  Pencil,
  Plus,
  ScrollText,
  Search,
  SlidersHorizontal,
} from 'lucide-react-native'
import { Status } from '@/components/Status'
import { STATUS } from '@/types/status'
import { Card } from '@/components/Card'
import { COLORS } from '@/styles/colors'
import { Divider } from '@/components/Divider'
import { ButtonIcon } from '@/components/ButtonIcon'
import { formatCurrencyBRL } from '@/utils/formatCurrencyBRL'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Filter } from './components/Filter'
import { QuoteSchema } from '@/types/quote'
import { getQuotesWithFilters } from '@/storage/quoteStorage'
import { useFocusEffect } from '@react-navigation/native'
import { FormProvider, useForm } from 'react-hook-form'
import { FilterQuoteListSchema } from '@/types/filterQuoteList'
import { schemaFilterQuoteList } from '@/schemas/filterQuoteList'
import { zodResolver } from '@hookform/resolvers/zod'
import { FILTER_QUOTE_LIST_DEFAULT } from '@/constants/filterQuoteList'

type QuoteListProps = StackRoutesProps<'list'>

export function QuoteList({ navigation }: QuoteListProps) {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [quotes, setQuotes] = useState<QuoteSchema[]>([])
  const [searchValue, setSearchValue] = useState('')
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const methodsFilter = useForm<FilterQuoteListSchema>({
    resolver: zodResolver(schemaFilterQuoteList),
    defaultValues: FILTER_QUOTE_LIST_DEFAULT,
  })

  const openFilters = () => {
    bottomSheetRef.current?.expand()
  }

  const handleApplyFilters = (data: FilterQuoteListSchema) => {
    bottomSheetRef.current?.close()
    fetchQuotes()
  }

  const handleResetFilters = () => {
    methodsFilter.reset(FILTER_QUOTE_LIST_DEFAULT)
    setSearchValue('')
    bottomSheetRef.current?.close()
    fetchQuotes()
  }

  const fetchQuotes = async () => {
    const filters = methodsFilter.getValues()
    const quotes = await getQuotesWithFilters(filters)
    setQuotes(quotes)
  }

  const handleSearchChange = (text: string) => {
    setSearchValue(text)

    // Limpar timer anterior se existir
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Criar novo timer de 1 segundo
    debounceTimerRef.current = setTimeout(() => {
      methodsFilter.setValue('search', text)
      fetchQuotes()
    }, 1000)
  }

  // Limpar timer ao desmontar o componente
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchQuotes()
    }, [])
  )

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

          <Button onPress={() => navigation.navigate('createOrUpdate')}>
            <Plus color={COLORS.BASE_WHITE} />
            <CustomText variant="subTitle2" color="white">
              New
            </CustomText>
          </Button>
        </View>

        <Divider />

        <View style={styles.main}>
          <View style={styles.filter}>
            <View style={{ flex: 1 }}>
              <TextField
                icon={<Search />}
                placeholder="Title or Client..."
                value={searchValue}
                onChangeText={handleSearchChange}
              />
            </View>

            <ButtonIcon onPress={openFilters}>
              <SlidersHorizontal color={COLORS.BASE_PURPLE} />
            </ButtonIcon>
          </View>

          <FlatList
            data={quotes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 208, gap: 8 }}
            ListEmptyComponent={() => (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <ScrollText size={24} color={COLORS.BASE_PURPLE} />
                <CustomText variant="body2" color="gray_500">
                  Create your first quote
                </CustomText>
              </View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('details', { id: item.id })}
              >
                <Card styleChildren={styles.cardList}>
                  <View style={styles.textContainer}>
                    <CustomText variant="subTitle1">{item.title}</CustomText>
                    <CustomText variant="body2" color="gray_600">
                      {item.client}
                    </CustomText>
                  </View>

                  <View style={styles.details}>
                    <Status status={item.status} />
                    <CustomText variant="subTitle1">
                      {formatCurrencyBRL(item.totalInCents)}
                    </CustomText>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <FormProvider {...methodsFilter}>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['40%', '68%']}
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
          <Filter
            onClose={() => bottomSheetRef.current.close()}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
        </BottomSheet>
      </FormProvider>
    </GestureHandlerRootView>
  )
}
