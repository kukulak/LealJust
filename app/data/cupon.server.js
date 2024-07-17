import { prisma } from "./database.server";

export async function newCupon(dataCupon, userId) {
  try {
    console.log("cupon SERVER", dataCupon);
    // Convertir las fechas a ISO-8601
    const inicio = dataCupon.inicio
      ? new Date(dataCupon.inicio).toISOString()
      : undefined;
    const termino = dataCupon.termino
      ? new Date(dataCupon.termino).toISOString()
      : undefined;
    return await prisma.Cupon.create({
      data: {
        usuario: { connect: { id: userId || undefined } },
        nombre: dataCupon.nombre,
        formulaData: dataCupon.formulaData,
        categoria: dataCupon.categoria,
        oferta: dataCupon.oferta,
        servicio: dataCupon.servicio,
        descripcion: dataCupon.descripcion,
        visitsRequired: Number(dataCupon.visitsRequired),
        visitsRemaining: Number(dataCupon.visitsRequired),
        activo: dataCupon.activo === "on" ? true : false,
        inicio: inicio,
        termino: termino,
      },
    });
  } catch (error) {
    // throw new Error('Falla en crear perfil para el Peludo', error)
    throw new Error(error);
  }
}

export async function registerVisit(userId, couponId) {
  const coupon = await prisma.Cupon.findUnique({
    where: { id: couponId },
  });

  // if (!coupon || coupon.userId !== userId || coupon.active) {
  //   throw new Error('Cupón inválido')
  // }
  console.log("LLAMADO DE REGITRO DE VISITA");

  const newVisitsRemaining = coupon.visitsRemaining - 1;

  return prisma.Cupon.update({
    where: { id: couponId },
    data: {
      visitsRemaining: newVisitsRemaining,
      activo: newVisitsRemaining === 0 ? true : coupon.activo,
    },
  });
}

// export async function getCupones(categoria) {
//   try {
//     return await prisma.Cupon.findMany({ where: { categoria } })
//   } catch (error) {
//     console.log(error)
//   }
// }

export async function getCupones(categoria, peludoId) {
  try {
    // const cupones = await prisma.Cupon.findMany({
    //   where: { categoria, NOT: { used: { some: { peludoId } } } }
    // })
    // Obtener cupones junto con los registros de uso

    const todayDate = new Date();

    const cupones = await prisma.cupon.findMany({
      where: { categoria },
      include: {
        used: {
          where: { peludoId },
        },
      },
    });

    const caducidadCupones = cupones.filter((cupon) => {
      const iniciaDate = new Date(cupon.inicio);
      const terminoDate = new Date(cupon.termino);
      return iniciaDate <= todayDate && terminoDate >= todayDate;
    });

    const cuponesActualizados = caducidadCupones.filter((cupon) => {
      const usage = cupon.used.find((usage) => usage.peludoId === peludoId);
      return (
        !usage ||
        (cupon.visitsRemaining = cupon.visitsRequired - usage.timesUsed)
      );
    });

    // Filtrar cupones en la aplicación
    const cuponesFiltrados = cuponesActualizados.filter((cupon) => {
      const usage = cupon.used.find((usage) => usage.peludoId === peludoId);
      return !usage || (usage && usage.timesUsed < cupon.visitsRequired);
    });

    // // Filtrar cupones en la aplicación
    // const cuponesFiltrados = cupones.filter(cupon => {
    //   const usage = cupon.used.find(usage => usage.peludoId === peludoId)
    //   return !usage || (usage && usage.timesUsed - 1 < cupon.visitsRequired)
    // })

    return cuponesFiltrados;
    // return cupones
  } catch (error) {
    console.log(error);
  }
}

export async function getCuponById(id) {
  try {
    return await prisma.Cupon.findFirst({
      where: { id },
      include: {
        _count: {
          select: { used: true },
        },
      },
    });
  } catch (error) {
    throw new Error("Feiled to get cupon");
  }
}

export async function getUsedCupones(categoria, peludo) {
  try {
    const cupones = await prisma.Cupon.findMany({
      where: {
        categoria,
        used: {
          some: {
            peludoId: peludo,
          },
        },
      },
    });

    return cupones;
  } catch (error) {
    console.log(error);
  }
}

export async function getCuponUsageCount() {
  try {
    const cupones = await prisma.Cupon.findMany({
      select: {
        id: true,
        nombre: true, // Suponiendo que los cupones tienen un nombre o alguna otra identificación
        _count: {
          select: { used: true },
        },
      },
    });

    return cupones;
  } catch (error) {
    console.error("Error fetching cupon usage count:", error);
    console.log(error);
    throw new Error("Error fetching cupon usage count");
  }
}

export async function getAllCupons() {
  try {
    return await prisma.Cupon.findMany({
      where: {},
      orderBy: [{ fecha: "asc" }],
      include: {
        _count: {
          select: { used: true },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateCupon(id, cuponData) {
  try {
    const inicio = cuponData.inicio
      ? new Date(cuponData.inicio).toISOString()
      : undefined;
    const termino = cuponData.termino
      ? new Date(cuponData.termino).toISOString()
      : undefined;
    await prisma.Cupon.update({
      where: { id },
      data: {
        nombre: cuponData.nombre,
        formulaData: cuponData.formulaData,
        categoria: cuponData.categoria,
        servicio: cuponData.servicio,
        descripcion: cuponData.descripcion,
        oferta: cuponData.oferta,
        fecha: cuponData.fecha && new Date(cuponData.fecha),
        visitsRequired: Number(cuponData.visitsRequired),
        activo: cuponData.activo ? true : false,
        inicio: inicio,
        termino: termino,
      },
    });
  } catch (error) {
    console.log(error, "EL ERRROR AL ACTUALIZAR CUPON");
    throw new Error("Failed to update cupon.");
  }
}

export async function deleteCupon(id) {
  try {
    await prisma.Cupon.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to delete cupon.");
  }
}
