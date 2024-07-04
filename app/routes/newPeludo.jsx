import { redirect, useOutletContext, useNavigate } from "@remix-run/react";
// import { validateCredentials } from '../data/validation.server'

import PeludoForm from "../components/PeludoForm";
// import Compressor from "compressorjs";
import imageCompression from "browser-image-compression";

import { newPeludo } from "../data/peludo.server";
import { requireUserSession } from "../data/auth.server";
import { ImageUploader } from "../components/ImageUploader";
import { useState } from "react";
// import { createFoto } from '../data/foto.server'
// import { validateCredentials } from '../data/validation.server'

const CreatePeludo = () => {
  const navigate = useNavigate();

  const { clienteId } = useOutletContext();
  console.log("DESDE NEW PELUDO", clienteId);
  const [formData, setFormData] = useState({});

  async function HandleFileUpload(file) {
    try {
      // Opciones de compresión
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        initialQuality: 0.8,
      };

      // Comprimir la imagen utilizando browser-image-compression
      const compressedFile = await imageCompression(file, options);

      // Crear un FormData y agregar la imagen comprimida
      let inputFormData = new FormData();
      inputFormData.append("dream-pic", compressedFile, file.name);

      // Enviar la imagen comprimida al servidor
      const response = await fetch("/images", {
        method: "POST",
        body: inputFormData,
      });

      if (typeof document === "undefined") {
        console.log("running in a server environment");
      } else {
        console.log("running in a browser environment");
      }

      // Manejar la respuesta del servidor
      const { imageUrl } = await response.json();

      // Actualizar el estado con la URL de la imagen
      setFormData({
        ...formData,
        peludoPicture: imageUrl,
      });
    } catch (error) {
      console.error("Error during image compression or upload:", error);
    }
  }

  return (
    <div className="  w-full items-center flex flex-col gap-5">
      <ImageUploader
        onChange={HandleFileUpload}
        imageUrl={formData.peludoPicture}
        // existedImage={}
      />
      <PeludoForm imageUrl={formData.peludoPicture} usuarioId={clienteId} />
      <div className="w-full items-center flex flex-col gap-5">
        <button
          className="  self-center border-2 border-gray-600 rounded-lg text-lg text-gray-100 text-center py-3  px-5 mt-3 mb-20 "
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default CreatePeludo;

export async function action({ request }) {
  const userId = await requireUserSession(request);
  console.log(userId.userId, "by REQUEST");
  //validate user input
  const formData = await request.formData();
  const dataPeludo = Object.fromEntries(formData);
  console.log("DATA PELUDO", dataPeludo);
  const file = await formData.get("imageUrl");

  const deHumano =
    dataPeludo.usuarioId.length > 8 ? dataPeludo.usuarioId : userId.userId;

  // try {
  //   validateCredentials(dataPeludo)
  // } catch (error) {
  //   return error
  // }

  try {
    await newPeludo(dataPeludo, deHumano, file);
    // await newPeludo(dataPeludo, userId.userId, file)
    console.log("action processed", dataPeludo.nombre);
    return redirect("/");
  } catch (error) {
    console.log(error);
    if (error.status === 422) {
      return { dataPeludo: error.message };
    } else {
      return { dataPeludo: error.message };
    }
  }
}
