import { prisma } from './database.server'

export async function createFoto(peludoId, file) {
  console.log(
    'PARA HACER LA FOTO HAY QUE PASAR POR AQUI coN DATA CORRECTA',
    peludoId,
    file
  )
  const newFoto = await prisma.foto.create({
    data: {
      peludoId,
      url: file
    }
  })
  return newFoto
}
