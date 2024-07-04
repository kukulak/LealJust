import { prisma } from "./database.server";
import { redirect } from "@remix-run/node";

//
//
//

export async function createPaquete(categoria, cantidad, peludoId) {
  try {
    const paquete = await prisma.Paquete.create({
      data: {
        categoria,
        cantidad: Number(cantidad),
        peludoId,
      },
    });

    console.log("PAQUETE +CREADO");

    if (peludoId) {
      redirect("/homeAdmin");
      console.log("si esta el perro");

      // throw new Error("Peludo not found");
    }
    return paquete;
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function getPaquetesPorPeludo(peludoId) {
  try {
    const paquetes = await prisma.Paquete.findMany({
      where: { peludoId },
    });

    return paquetes;
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function registerInPaquete(peludoId, paqueteId, diasUsados) {
  try {
    const paquete = await prisma.Paquete.update({
      where: { id: paqueteId },
      data: { usados: { increment: Number(diasUsados) } },
    });

    if (paquete.usados >= paquete.dias) {
      // Marcar paquete como usado por completo si es necesario
      await prisma.paquete.update({
        where: { id: paqueteId },
        data: { usados: paquete.dias },
      });
    }

    return paquete;
    // return redirect(`/perro/${peludoId}`);
  } catch (error) {
    console.log("ERROR", error);
  }
}
