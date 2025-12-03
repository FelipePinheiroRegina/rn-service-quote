import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

// Estender o dayjs com os plugins necessários
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

// Configurar locale para português do Brasil
dayjs.locale('pt-br')

// Configurar timezone padrão para o Brasil (São Paulo)
dayjs.tz.setDefault('America/Sao_Paulo')

export default dayjs
