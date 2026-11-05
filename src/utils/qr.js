import QRCode from 'qrcode'

export const generateQrPayload = (booking) => {
  const payload = {
    v: 1,
    b: booking.code,
    r: booking.roomId,
    s: `${booking.date}T${booking.start}`,
    e: `${booking.date}T${booking.end}`,
    t: booking.qrToken
  }
  return JSON.stringify(payload)
}

export const generateQrDataUrl = async (booking) => {
  const payload = generateQrPayload(booking)
  return QRCode.toDataURL(payload, {
    width: 192,
    margin: 2,
    color: {
      dark: '#2B2829',
      light: '#FFFFFF'
    }
  })
}

export const generateQrSvg = async (booking) => {
  const payload = generateQrPayload(booking)
  return QRCode.toString(payload, {
    type: 'svg',
    width: 192,
    margin: 2,
    color: {
      dark: '#2B2829',
      light: '#FFFFFF'
    }
  })
}