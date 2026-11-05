import { getRoomById } from '@/data/rooms'

export const generateIcsContent = (booking) => {
  const room = getRoomById(booking.roomId)
  const now = new Date()
  const startDate = new Date(`${booking.date}T${booking.start}:00`)
  const endDate = new Date(`${booking.date}T${booking.end}:00`)

  const formatIcsDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const uid = `${booking.code}@telustudyspace.ac.id`
  const dtstamp = formatIcsDate(now)
  const dtstart = formatIcsDate(startDate)
  const dtend = formatIcsDate(endDate)
  const summary = room ? `Reservasi ${room.name}` : 'Reservasi Ruangan'
  const description = `Kode Booking: ${booking.code}\\nKeperluan: ${booking.purpose}\\nPeserta: ${booking.attendees} orang`

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TEL-U StudySpace//Reservasi//ID
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${room ? `${room.building} Lantai ${room.floor}` : ''}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
}

export const downloadIcsFile = (booking) => {
  const content = generateIcsContent(booking)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${booking.code}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}