import { CustomText } from '@/components/CustomText'
import { BottomSheetView } from '@gorhom/bottom-sheet'

export function Filter() {
  return (
    <BottomSheetView style={{ padding: 16 }}>
      <CustomText variant="title">Filtros</CustomText>
      <CustomText variant="body1" color="gray_600">
        Aqui você coloca os campos de filtro...
      </CustomText>
    </BottomSheetView>
  )
}
