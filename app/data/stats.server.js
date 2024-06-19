// import { getTotalUsers } from './auth.server'/
import { prisma } from './database.server'
import { getCuponUsageCount } from './cupon.server'

// export async function getCuponUsageStats() {
//   try {
//     const cupones = await getCuponUsageCount()
//     console.log('Cupones data fetched:', cupones)

//     const totalUsers = await getTotalUsers()
//     console.log('Total users fetched:', totalUsers)

//     const stats = cupones.map(cupon => ({
//       ...cupon,
//       usageRatio: totalUsers ? cupon._count.used / totalUsers : 0
//     }))

//     console.log('Stats computed:', stats)
//     return stats
//   } catch (error) {
//     console.error('Error fetching cupon usage stats:', error)
//     throw new Error('Error fetching cupon usage stats')
//   }
// }

export async function getCuponUsageStats() {
  console.log('I know I exist STATS')
  const cupones = await getCuponUsageCount()
  return cupones
  // try {
  //   const cupones = await getCuponUsageCount()
  //   console.log('Cupones data fetched:', cupones)

  //   const totalUsers = await getTotalUsers()
  //   console.log('Total users fetched:', totalUsers)

  //   const stats = cupones.map(cupon => ({
  //     ...cupon,
  //     usageRatio: totalUsers ? cupon._count.used / totalUsers : 0
  //   }))

  //   console.log('Stats computed:', stats)
  //   return stats
  // } catch (error) {
  //   console.error('Error fetching cupon usage stats:', error)
  //   throw new Error('Error fetching cupon usage stats')
  // }
}
