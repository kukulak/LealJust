import { redirect, useOutletContext, useNavigate } from "@remix-run/react";
// import { validateCredentials } from '../data/validation.server'

import PeludoForm from "../components/PeludoForm";
import Compressor from "compressorjs";

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

  //handleFileUpload puede editar las dos imagenes? es decir subir la imagen del perro pero sin importar si esxtiste la imagen de perro se puede que cree el qrcode? no va a suceder cuandno se envie la forma, se va a hacer cuando? bueno si cuando se envie pero entonces quien se va a hacer cargo de esa accion? por que la forma no lo va  hacer por que no puede hacer las dos cosas.puede hacerlo el servidor pero el problema es que primero se sube la imagen y despues se crea el objeto perro. creo que lo que dice en donde se crea es la informacion que necesita, debemos tener el id del nuevo perro y eso lo obtenemos del lado del server... si es asi entonces no hay de otra la imagen se crea en el lado del server, pero teniamos un problema, la constitucion del archivo era diferente a lo que necesitamso ahora volvamos a analizar de que debe estar hecho.
  async function handleFileUpload(file) {
    // Comprimir la imagen utilizando compressor.js
    const compressedImage = await new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6, // Ajusta la calidad de la compresión (0.1 - 1.0)
        maxWidth: 800, // Establece el ancho máximo de la imagen
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });

    let inputFormData = new FormData();
    inputFormData.append("dream-pic", compressedImage);
    // const imageUrl = await uploadImage(file)
    const response = await fetch("/images", {
      method: "POST",
      body: inputFormData,
    });

    if (typeof document === "undefined") {
      console.log("running in a server environment");
    } else {
      console.log("running in a browser environment");
    }

    console.log("HANDELING", inputFormData.getAll("dream-pic"));

    const { imageUrl } = await response.json();

    // const data = await response.json()
    // const imageUrl = data.imageUrl
    // const imageUrl = await response.text()
    // Aquí obtendrás la URL de la imagen

    console.log("IMAGEURL", imageUrl);

    // createFoto(peludoId, imageUrl)

    setFormData({
      ...formData,
      peludoPicture: imageUrl,
    });
  }

  // async function HandleQrUpload(file) {
  //   try {
  //     // Crear un FormData y agregar la imagen comprimida
  //     let inputFormData = new FormData();
  //     inputFormData.append("dream-pic", file, file.name);

  //     // Enviar la imagen comprimida al servidor
  //     const response = await fetch("/images", {
  //       method: "POST",
  //       body: inputFormData,
  //     });

  //     if (typeof document === "undefined") {
  //       console.log("running in a server environment");
  //     } else {
  //       console.log("running in a browser environment");
  //     }

  //     // Manejar la respuesta del servidor
  //     const { imageUrl } = await response.json();
  //     console.log("IMAGEURL in HANDLER", imageUrl);

  //     // Actualizar el estado con la URL de la imagen
  //     setFormData({
  //       ...formData,
  //       qrPeludo: imageUrl,
  //     });
  //   } catch (error) {
  //     console.error("Error during image upload:", error);
  //   }
  // }

  return (
    <div className="  w-full items-center flex flex-col gap-5">
      <ImageUploader
        onChange={handleFileUpload}
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
