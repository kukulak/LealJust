import { Upload } from "@aws-sdk/lib-storage";
import QRCode from "qrcode";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

import { createId } from "@paralleldrive/cuid2";
import { unstable_parseMultipartFormData } from "@remix-run/node";

// import { Readable } from 'stream'

////////

const s3 = new S3Client({
  region: process.env.DREAMS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.DREAMS_ACCES_KEY_ID,
    secretAccessKey: process.env.DREAMS_SECRET_ACCESS_KEY,
  },
});

////////////

async function uploadHandler(args) {
  console.log("ARGS", await args);
  if (args.name !== "dream-pic") {
    args.data.resume();
    return;
  }
  // Crear un buffer a partir del stream de datos binarios
  const chunks = [];
  for await (const chunk of args.data) {
    chunks.push(chunk);
  }
  const imageData = Buffer.concat(chunks);
  ///////
  const cuidName = `${createId()}.${args.filename.split(".").slice(-1)}`;
  const command = new PutObjectCommand({
    Bucket: process.env.DREAMS_BUCKET_NAME || "",
    Key: cuidName,
    Body: imageData,
  });

  try {
    const response = await s3.send(command);
    console.log("FU:L RESPONSE?", response);
    // return response
    // Return the URL of the uploaded image
    return `https://${process.env.DREAMS_BUCKET_NAME}.s3.amazonaws.com/${cuidName}`;
  } catch (err) {
    console.error("ES UN ERROR", err);
  }
}

export async function uploadImage(request) {
  ////
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );

  const file = formData.get("dream-pic")?.toString() || "";

  console.log({ imageUrl: file });

  return file;
}

export async function uploadQr(text) {
  try {
    // Generar el código QR como buffer
    const qrBuffer = await QRCode.toBuffer(text, { type: "image/png" });

    // Generar un nombre único para el archivo
    const cuidName = `${createId()}.png`;

    // Crear el comando para subir la imagen al bucket de S3
    const command = new PutObjectCommand({
      Bucket: process.env.DREAMS_BUCKET_NAME || "",
      Key: cuidName,
      Body: qrBuffer,
      ContentType: "image/png", // Especificar el tipo de contenido
    });

    // Enviar el comando para subir la imagen
    const response = await s3.send(command);
    console.log("Upload successful", response);

    // Devolver la URL de la imagen subida
    return `https://${process.env.DREAMS_BUCKET_NAME}.s3.amazonaws.com/${cuidName}`;
  } catch (err) {
    console.error("Error uploading QR code", err);
    throw new Error("Failed to upload QR code");
  }
}

export async function deleteImage(imageKey) {
  console.log("s3SERVER", imageKey);
  const command = new DeleteObjectCommand({
    Bucket: process.env.DREAMS_BUCKET_NAME,
    Key: imageKey,
  });

  try {
    const response = await s3.send(command);
    console.log("Image deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
}

// export async function listImages() {
//   const command = new ListObjectsV2Command({
//     Bucket: process.env.DREAMS_BUCKET_NAME,
//   });

//   try {
//     const response = await s3.send(command);
//     const images = response.Contents.map((item) => ({
//       key: item.Key,
//       url: `https://${process.env.DREAMS_BUCKET_NAME}.s3.amazonaws.com/${item.Key}`,
//     }));
//     return images;
//   } catch (error) {
//     console.error("Error listing images:", error);
//     throw new Error("Failed to list images");
//   }
// }

// Nueva función para eliminar la referencia de la base de datos
// export async function deleteImageReference(imageKey) {
//   try {
//     const result = await prisma.foto.deleteMany({
//       where: {
//         url: `https://${process.env.DREAMS_BUCKET_NAME}.s3.amazonaws.com/${imageKey}`,
//       },
//     });
//     return result;
//   } catch (error) {
//     console.error("Error deleting image reference:", error);
//     throw new Error("Failed to delete image reference");
//   }
// }
