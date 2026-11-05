const createCrowd = (seed) => {
  // Deterministic pseudo-random crowd values based on room seed
  const arr = []
  for (let i = 0; i < 14; i++) {
    const val = Math.sin(seed * (i + 1) * 12.9898) * 43758.5453
    arr.push(Math.abs(val - Math.floor(val)))
  }
  return arr
}

const ROOMS_DATA = [
  {
    id: 'room-a2',
    name: 'Ruang Diskusi A2',
    type: 'diskusi',
    building: 'Gedung A',
    floor: 2,
    capacityMin: 2,
    capacityMax: 6,
    facilities: ['proyektor', 'papan', 'ac', 'stopkontak', 'wifi'],
    description: 'Ruang diskusi cozy dengan pencahayaan natural untuk diskusi kelompok kecil. Dilengkapi proyektor dan papan tulis untuk presentasi.',
    rules: [
      'Maksimal 6 orang',
      'Tidak diperkenankan membawa makanan',
      'Matikan AC saat tidak digunakan',
      'Kembalikan fasilitas setelah penggunaan'
    ],
    photos: ['/images/rooms/room-a2-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 7,
    closeHour: 21,
    crowd: createCrowd(1)
  },
  {
    id: 'room-b3',
    name: 'Ruang Belajar Mandiri B3',
    type: 'belajar-mandiri',
    building: 'Gedung B',
    floor: 3,
    capacityMin: 1,
    capacityMax: 2,
    facilities: ['ac', 'stopkontak', 'wifi', 'ergonomis'],
    description: 'Booth belajar individual dengan desain kedap suara. Cocok untuk fokus belajar atau mengerjakan tugas.',
    rules: ['Untuk 1-2 orang', 'Jaga ketenangan', 'Tidak untuk diskusi', 'Bawa pulang sampah'],
    photos: ['/images/rooms/room-b3-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 7,
    closeHour: 21,
    crowd: createCrowd(2)
  },
  {
    id: 'room-c1',
    name: 'Ruang Rapat C1',
    type: 'rapat',
    building: 'Gedung C',
    floor: 1,
    capacityMin: 4,
    capacityMax: 10,
    facilities: ['tv', 'sound', 'ac', 'stopkontak', 'wifi', 'dispenser'],
    description: 'Ruang rapat formal dengan smart TV dan sound system. Cocok untuk meeting departemen atau seminar kecil.',
    rules: ['Maksimal 10 orang', 'Booking minimal 1 jam', 'Matikan perangkat setelah digunakan', 'Tidak untuk kegiatan sosial'],
    photos: ['/images/rooms/room-c1-1.jpg'],
    openDays: [1, 2, 3, 4, 5],
    openHour: 8,
    closeHour: 18,
    crowd: createCrowd(3)
  },
  {
    id: 'room-a5',
    name: 'Ruang Kolaborasi A5',
    type: 'kolaborasi',
    building: 'Gedung A',
    floor: 5,
    capacityMin: 6,
    capacityMax: 12,
    facilities: ['proyektor', 'tv', 'ac', 'stopkontak', 'wifi', 'sound'],
    description: 'Ruang kolaborasi terbuka dengan tata letak fleksibel. Dilukung whiteboard besar dan layar ganda untuk brainstorming.',
    rules: ['Maksimal 12 orang', 'Gunakan whiteboard sesuai kebutuhan', 'Jaga kerapian ruangan', 'Booking maksimal 3 jam'],
    photos: ['/images/rooms/room-a5-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 7,
    closeHour: 21,
    crowd: createCrowd(4)
  },
  {
    id: 'room-b1',
    name: 'Ruang Diskusi B1',
    type: 'diskusi',
    building: 'Gedung B',
    floor: 1,
    capacityMin: 3,
    capacityMax: 6,
    facilities: ['proyektor', 'ac', 'stopkontak', 'wifi'],
    description: 'Ruang diskusi dengan layout meja oval. Ideal untuk diskusi kelompok dan kelas tutorial.',
    rules: ['Maksimal 6 orang', 'Gunakan fasilitas dengan baik', 'Tidak membawa makanan berat', 'Matikan lampu dan AC jika keluar'],
    photos: ['/images/rooms/room-b1-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 7,
    closeHour: 21,
    crowd: createCrowd(5)
  },
  {
    id: 'room-d2',
    name: 'Ruang Belajar D2',
    type: 'belajar-mandiri',
    building: 'Gedung D',
    floor: 2,
    capacityMin: 1,
    capacityMax: 2,
    facilities: ['ac', 'stopkontak', 'wifi', 'ergonomis'],
    description: 'Pod belajar pribadi dengan pencahayaan adjustable. Dilengkapi charging station.',
    rules: ['Hanya untuk 1-2 orang', 'Tidak untuk diskusi kelompok', 'Jaga kebersihan', 'Waktu maksimal 4 jam/hari'],
    photos: ['/images/rooms/room-d2-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 7,
    closeHour: 21,
    crowd: createCrowd(6)
  },
  {
    id: 'room-c3',
    name: 'Ruang Rapat C3',
    type: 'rapat',
    building: 'Gedung C',
    floor: 3,
    capacityMin: 6,
    capacityMax: 10,
    facilities: ['tv', 'proyektor', 'ac', 'stopkontak', 'wifi', 'dispenser'],
    description: 'Ruang rapat executive dengan meja oval dan kursi ergonomis. Dilengkapi video conference setup.',
    rules: ['Maksimal 10 orang', 'Booking melalui sistem', 'Siapkan bahan meeting', 'Bersihkan setelah digunakan'],
    photos: ['/images/rooms/room-c3-1.jpg'],
    openDays: [1, 2, 3, 4, 5],
    openHour: 8,
    closeHour: 17,
    crowd: createCrowd(7)
  },
  {
    id: 'room-a8',
    name: 'Ruang Kolaborasi A8',
    type: 'kolaborasi',
    building: 'Gedung A',
    floor: 8,
    capacityMin: 8,
    capacityMax: 15,
    facilities: ['proyektor', 'tv', 'sound', 'ac', 'stopkontak', 'wifi', 'papan'],
    description: 'Creative studio dengan dinding whiteboard dan post-it area. Cocok untuk design sprint dan workshop.',
    rules: ['Maksimal 15 orang', 'Sediakan facilitator', 'Booking minimal 2 jam', 'Kembalikan ruangan seperti semula'],
    photos: ['/images/rooms/room-a8-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 9,
    closeHour: 21,
    crowd: createCrowd(8)
  },
  {
    id: 'room-e1',
    name: 'Ruang Diskusi E1',
    type: 'diskusi',
    building: 'Gedung E',
    floor: 1,
    capacityMin: 2,
    capacityMax: 5,
    facilities: ['proyektor', 'ac', 'wifi', 'stopkontak'],
    description: 'Ruang diskusi intim dengan view taman. Sempurna untuk tutor dan student.',
    rules: ['Maksimal 5 orang termasuk tutor', 'Untuk tutoring dan bimbingan', 'Jaga ketenangan', 'Waktu max 2 jam'],
    photos: ['/images/rooms/room-e1-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 7,
    closeHour: 21,
    crowd: createCrowd(9)
  },
  {
    id: 'room-b5',
    name: 'Ruang Belajar B5',
    type: 'belajar-mandiri',
    building: 'Gedung B',
    floor: 5,
    capacityMin: 1,
    capacityMax: 2,
    facilities: ['ac', 'stopkontak', 'wifi'],
    description: 'Study pod dengan double monitor setup. Cocok untuk coding dan tugas akhir.',
    rules: ['Individual atau berdua', 'Bawa headset untuk audio', 'Tidak untuk meeting', 'Maksimal 6 jam per hari'],
    photos: ['/images/rooms/room-b5-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 7,
    closeHour: 22,
    crowd: createCrowd(10)
  },
  {
    id: 'room-c2',
    name: 'Ruang Rapat C2',
    type: 'rapat',
    building: 'Gedung C',
    floor: 2,
    capacityMin: 4,
    capacityMax: 8,
    facilities: ['tv', 'ac', 'stopkontak', 'wifi', 'dispenser'],
    description: 'Meeting room dengan layout theater. Cocok untuk presentasi dan training.',
    rules: ['Maksimal 8 orang', 'Gunakan mic saat presentasi', 'Booking min 1 jam', 'Matikan perangkat setelah selesai'],
    photos: ['/images/rooms/room-c2-1.jpg'],
    openDays: [1, 2, 3, 4, 5],
    openHour: 8,
    closeHour: 18,
    crowd: createCrowd(11)
  },
  {
    id: 'room-a10',
    name: 'Ruang Kolaborasi A10',
    type: 'kolaborasi',
    building: 'Gedung A',
    floor: 10,
    capacityMin: 5,
    capacityMax: 12,
    facilities: ['proyektor', 'tv', 'ac', 'stopkontak', 'wifi', 'sound', 'papan'],
    description: 'Innovation hub dengan 3 whiteboard dan voting system digital. Untuk hackathon dan project kickoff.',
    rules: ['Maksimal 12 orang', 'Coordinator wajib hadir', 'Booking min 3 jam', 'Siapkan konsep sebelum datang'],
    photos: ['/images/rooms/room-a10-1.jpg'],
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 9,
    closeHour: 21,
    crowd: createCrowd(12)
  }
]

export const ROOMS = ROOMS_DATA

export const getRoomsByType = (type) => {
  if (type === 'all') return ROOMS
  return ROOMS.filter(r => r.type === type)
}

export const getRoomById = (id) => ROOMS.find(r => r.id === id)

export const ROOM_TYPES = [
  { value: 'all', label: 'Semua' },
  { value: 'diskusi', label: 'Diskusi' },
  { value: 'belajar-mandiri', label: 'Belajar Mandiri' },
  { value: 'rapat', label: 'Rapat' },
  { value: 'kolaborasi', label: 'Kolaborasi' }
]