import { format, parseISO, isValid } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDateIndonesian = (dateStr) => {
  try {
    const d = parseISO(dateStr)
    if (!isValid(d)) return dateStr
    return format(d, 'EEEE, d MMM yyyy', { locale: id })
  } catch {
    return dateStr
  }
}

export const formatDateShort = (dateStr) => {
  try {
    const d = parseISO(dateStr)
    if (!isValid(d)) return dateStr
    return format(d, 'EEE, d MMM', { locale: id })
  } catch {
    return dateStr
  }
}

export const formatDayName = (dateStr) => {
  try {
    const d = parseISO(dateStr)
    if (!isValid(d)) return ''
    return format(d, 'EEE', { locale: id })
  } catch {
    return ''
  }
}

export const formatDayNumber = (dateStr) => {
  try {
    const d = parseISO(dateStr)
    if (!isValid(d)) return ''
    return format(d, 'd', { locale: id })
  } catch {
    return ''
  }
}