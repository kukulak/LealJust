import { prisma } from "./database.server";

// export async function createUsed(cuponId, peludoId) {
//   await prisma.Used.create({
//     data: {
//       cuponId: { id: cuponId },
//       peludoId: { id: peludoId }
//     }
//   })
// }

export async function createUsed(cuponId, peludoId) {
  await prisma.Used.create({
    data: {
      cupon: { connect: { id: cuponId } },
      peludo: { connect: { id: peludoId } },
    },
  });
}

export async function upsertUsed(cuponId, peludoId) {
  try {
    // Usar upsert para actualizar o crear el registro
    await prisma.Used.upsert({
      where: {
        peludoId_cuponId: {
          peludoId,
          cuponId,
        },
      },
      update: {
        timesUsed: { increment: 1 }, // Incrementar timesUsed en 1 si el registro ya existe
      },
      create: {
        cupon: { connect: { id: cuponId } },
        peludo: { connect: { id: peludoId } },
        timesUsed: 1, // Establecer timesUsed en 1 si el registro no existe
      },
    });

    console.log("Cupón creado o actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el uso del cupón:", error);
  }
}

export async function getUsedByCupon(cuponId) {
  await prisma.used.findMany({ where: { id: cuponId } });
}

export async function getUsedByPeludo(peludoId) {
  await prisma.used.findMany({ where: { id: peludoId } });
}
