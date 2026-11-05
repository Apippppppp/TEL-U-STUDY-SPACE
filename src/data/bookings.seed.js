import { format, addDays, subDays } from 'date-fns'

const today = new Date()
const todayStr = format(today, 'yyyy-MM-dd')
const pastStr = format(subDays(today, 2), 'yyyy-MM-dd')
const futureStr = format(addDays(today, 1), 'yyyy-MM-dd')

export const INITIAL_BOOKINGS = [
  {
    code: 'SS-2611-K7Q4',
    roomId: 'room-a2',
    date: todayStr,
    start: '10:00',
    end: '12:00',
    attendees: 4,
    purpose: 'Diskusi kelompok mata kuliah IoT',
    note: 'Membutuhkan whiteboard spidol hitam',
    status: 'upcoming',
    qrToken: 'SS-2611-K7Q4-TOK-ROOM-A2-DEMO-001',
    createdAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    code: 'SS-2611-B9M2',
    roomId: 'room-b3',
    date: pastStr,
    start: '14:00',
    end: '16:00',
    attendees: 1,
    purpose: 'Belajar mandiri persiapan UAS',
    status: 'completed',
    qrToken: 'SS-2611-B9M2-TOK-ROOM-B3-DEMO-002',
    createdAt: format(subDays(today, 3), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    code: 'SS-2611-X4P8',
    roomId: 'room-c1',
    date: futureStr,
    start: '09:00',
    end: '11:00',
    attendees: 6,
    purpose: 'Rapat koordinasi panitia HIMA',
    status: 'cancelled',
    qrToken: 'SS-2611-X4P8-TOK-ROOM-C1-DEMO-003',
    createdAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss')
  }
]