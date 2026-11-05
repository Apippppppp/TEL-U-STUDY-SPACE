export const formatCapacity = (min, max) => {
  if (min === max) return `${min} orang`
  return `${min}–${max} orang`
}

export const formatDuration = (start, end) => {
  const startH = parseInt(start.split(':')[0], 10)
  const endH = parseInt(end.split(':')[0], 10)
  const hours = endH - startH
  return hours === 1 ? '1 jam' : `${hours} jam`
}

export const formatTimeRange = (start, end) => `${start}–${end}`