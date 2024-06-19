import { prisma } from './database.server'

export async function newFormula(dataFormula, userId) {
  try {
    console.log('Formula SERVER', dataFormula)
    return await prisma.Formula.create({
      data: {
        nombre: dataFormula.nombre,
        formula: dataFormula.formula,
        usuario: { connect: { id: userId || undefined } }
      }
    })
  } catch (error) {
    // throw new Error('Falla en crear perfil para el Peludo', error)
    throw new Error(error)
  }
}

export async function getFormula() {
  try {
    return await prisma.Formula.findMany({})
  } catch (error) {
    console.log(error)
  }
}
