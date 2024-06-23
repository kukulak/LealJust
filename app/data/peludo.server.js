import { prisma } from "./database.server";
import { ObjectId } from "mongodb";
import { createFoto } from "./foto.server";
import { qrCodeCreator } from "./qrCodeCreator";
import { uploadQr } from "./s3.server";

export async function newPeludo(dataPeludo, userId, file) {
  try {
    console.log("DATA FROm SERVER", dataPeludo);

    // que datos va a tener el qr code?
    // necesita una url
    // http://lealtad/perro/id

    const newPeludo = await prisma.Peludo.create({
      data: {
        nombre: dataPeludo.nombre,
        usuario: { connect: { id: userId || undefined } },
        raza: dataPeludo.raza,
        nacimiento: dataPeludo.nacimiento,
        foto: file,
        amigos: "",
        qrCode: "",
        instagram: dataPeludo.instagram,
      },
    });

    const qrCode = `https://incomparable-snickerdoodle-b2eb5f.netlify.app/perro/${newPeludo.id}`;

    const qrImage = await qrCodeCreator(qrCode);
    await uploadQr(qrImage);

    console.log("NEPEULUDO ID", newPeludo.id);

    if (newPeludo.foto) {
      createFoto(newPeludo.id, newPeludo.foto);
    }
    return newPeludo;
  } catch (error) {
    // throw new Error('Falla en crear perfil para el Peludo', error)
    throw new Error(error);
  }
}

// id            String @id  @default(auto()) @map("_id") @db.ObjectId
// fecha         DateTime @default(now())
// nombre        String
// usuario       User @relation(fields: [usuarioId], references: [id])
// usuarioId     String @db.ObjectId
// foto          String
// amigos        String
// nacimiento    String
// qrCode        String
// instagram

export async function getPeludo(peludoId) {
  if (!ObjectId.isValid(peludoId)) {
    throw new Error("Invalid Peludo ID");
  }
  const peludo = await prisma.Peludo.findUnique({
    where: { id: peludoId },
    include: { fotos: { orderBy: { id: "desc" } } },
    // include: { fotos: true }
  });

  if (!peludo) {
    throw new Error("Peludo not found");
  }

  const data = {
    nombre: peludo.nombre,
    usuario: peludo.usuario,
    foto: peludo.foto,
    raza: peludo.raza,
    nacimiento: peludo.nacimiento,
    id: peludo.id,
    likes: peludo.likes,
    amigos: peludo.amigos,
    qrCode: peludo.qrCode,
    instagram: peludo.instagram,
    cupones: peludo.cupones,
    fotos: peludo.fotos,
  };
  console.log("DATAPELUDOSERVER", data);
  return data;
}

export async function getAllPeludosByUser(humanoId) {
  try {
    const peludos = await prisma.Peludo.findMany({
      where: { usuarioId: humanoId },
      include: { fotos: { orderBy: { id: "desc" } } },
    });

    return peludos;
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function getAllPeludos(humanoId) {
  try {
    const peludos = await prisma.Peludo.findMany({
      where: { usuarioId: humanoId },
    });

    return peludos;
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function getPeludoByName(name) {
  try {
    const peludo = await prisma.Peludo.findMany({
      where: { nombre: name },
    });

    return peludo;
  } catch (error) {
    console.log("ERROR", error);
  }
}

//
// await updatePeludo(peludoId, userData, file)
//
export async function updatePeludo(id, peludoData, file) {
  console.log("UPDATE peludo", id, peludoData, file);
  try {
    const updatePeludo = await prisma.Peludo.update({
      where: { id },
      data: {
        nombre: peludoData.nombre,
        raza: peludoData.raza,
        nacimiento: peludoData.nacimiento,
        instagram: peludoData.instagram,
        foto: file,
      },
    });
    console.log("UPSATEPELUDO");
    if (file.includes("https")) {
      await createFoto(id, file);
    }
    console.log("createdFoto");

    return updatePeludo;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to update peludo.");
  }
}

export async function deletePeludo(id) {
  try {
    await prisma.Peludo.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to delete USER");
  }
}
