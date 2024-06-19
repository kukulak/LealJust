import { prisma } from './database.server'

export async function newEtiqueta(dataCupon, userId) {
  try {
    console.log('cupon SERVER', dataCupon)
    return await prisma.Etiqueta.create({
      data: {
        nombre: dataCupon.nombre,
        usuario: { connect: { id: userId || undefined } }
      }
    })
  } catch (error) {
    // throw new Error('Falla en crear perfil para el Peludo', error)
    throw new Error(error)
  }
}
