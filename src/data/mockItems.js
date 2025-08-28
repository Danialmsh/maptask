import { randomPointInRadius } from '../utils/geo'

export const generateMockItems = (center, count=20, maxR=5000) =>
    Array.from({length: count}, (_,i) => {
      const p = randomPointInRadius(center, maxR)
      return {
        id: i+1,
        name: `فروشگاه هیراد ${i+1}`,
        description: 'توضیح نمونه‌ی کوتاه برای این مکان.',
        address: 'تهران، خیابان نمونه، کوچه فرضی، پلاک ' + (10+i),
        coords: p,
        phone: '021-123456' + (i%10),
        tags: ['سوپرمارکت','هایپر','لبنیات'][i%3],
      }
    })
