import { prisma } from "./database.server";

export async function createFoto(peludoId, file) {
  console.log(
    "PARA HACER LA FOTO HAY QUE PASAR POR AQUI coN DATA CORRECTA",
    peludoId,
    file,
  );
  const newFoto = await prisma.foto.create({
    data: {
      peludoId,
      url: file,
    },
  });
  return newFoto;
}

export async function deleteImageReference(imageKey) {
  try {
    const result = await prisma.foto.deleteMany({
      where: {
        // url: `https://${process.env.DREAMS_BUCKET_NAME}.s3.amazonaws.com/${imageKey}`,
        id: imageKey,
        // id: Number(imageKey),
      },
    });
    return result;
  } catch (error) {
    console.error("Error deleting image reference:", error);
    throw new Error("Failed to delete image reference");
  }
}

export async function listImages() {
  try {
    const images = await prisma.foto.findMany();
    return images.map((image) => ({
      key: image.id, // Assuming `id` is the primary key for the image
      url: image.url,
    }));
  } catch (error) {
    console.error("Error listing images:", error);
    throw new Error("Failed to list images");
  }
}
