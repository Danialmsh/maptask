// این فایل فقط چند تا ابزار ژئویی می‌سازه که هرجا لازم داشتیم سریع صداشون کنیم

const R = 6371000 // شعاع زمین به متر
const toRad = d => d * Math.PI / 180

// فاصله روی کره زمین بین دو مختصات (به متر)

export const haversine = (a, b) => {
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
  return 2 * R * Math.asin(Math.sqrt(h))
}

// ساخت نقطه تصادفی داخل شعاع مشخص

export const randomPointInRadius = (center, maxR) => {
  const r = Math.sqrt(Math.random()) * maxR
  const t = Math.random() * 2 * Math.PI
  const dLat = (r / R) * (180 / Math.PI)
  const dLng = (r / (R * Math.cos(toRad(center.lat)))) * (180 / Math.PI)
  return { lat: center.lat + dLat * Math.cos(t), lng: center.lng + dLng * Math.sin(t) }
}

// ۳) چک اینکه یه نقطه توی شعاع مشخص هست یا نه

export const withinRadius = (c, p, rad) => haversine(c, p) <= rad
