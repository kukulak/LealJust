import { prisma } from './database.server'

export async function newCategoria(dataCupon, userId) {
  try {
    console.log('cupon SERVER', dataCupon)
    return await prisma.Categoria.create({
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

export async function getCategorias() {
  try {
    return await prisma.Categoria.findMany({})
  } catch (error) {
    console.log(error)
  }
}
