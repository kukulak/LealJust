import { Form, useNavigation, redirect, useLoaderData } from "@remix-run/react";

import Compressor from "compressorjs";

import { deletePeludo, getPeludo, updatePeludo } from "../data/peludo.server";
import { ImageUploader } from "../components/ImageUploader";
import { useState } from "react";

const EditPeludo = () => {
  const navigation = useNavigation();
  const peludo = useLoaderData();
  const [formData, setFormData] = useState({});

  const isSubmitting = navigation.state !== "idle";

  const defaultValues = peludo && {
    nombre: peludo.nombre,
    raza: peludo.raza,
    nacimiento: peludo.nacimiento,
    instagram: peludo.instagram,
    foto: peludo.foto,
  };

  async function HandleFileUpload(file) {
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

    console.log("IMAGEURL in HANDLER", imageUrl);

    setFormData({
      ...formData,
      peludoPicture: imageUrl,
    });
  }

  return (
    <div className=" max-w-[700px]  w-full items-center flex flex-col gap-0">
      <ImageUploader
        onChange={HandleFileUpload}
        imageUrl={formData.peludoPicture}
        // existedImage={defaultValues.foto}
      />
      <Form
        method="patch"
        // method={peludoData ? 'patch' : 'post'}
        className=" mt-0   w-10/12 flex flex-col gap-3 text-gray-900"
      >
        {formData.peludoPicture ? (
          <input
            type="hidden"
            name="imageUrl"
            id="imageUrl"
            value={formData.peludoPicture}
          />
        ) : (
          <input
            type="hidden"
            name="imageUrl"
            id="imageUrl"
            value={defaultValues.foto}
          />
        )}

        <div className="rounded-xl w-12/12 flex flex-col gap-3 text-gray-900 bg-gray-800 px-12 py-10">
          <label className=" text-gray-100" htmlFor="nombre">
            Nombre del peludo
          </label>
          <input
            className="h-10 p-4"
            type="text"
            name="nombre"
            id="nombre"
            required
            defaultValue={defaultValues.nombre}
          />
          <label className=" text-gray-100" htmlFor="raza">
            Raza
          </label>
          <input
            required
            className="h-10 p-4"
            type="text"
            name="raza"
            id="raza"
            defaultValue={defaultValues.raza}
          />

          <label className=" text-gray-100" htmlFor="nacimiento">
            Fecha de nacimiento
          </label>
          <input
            className="h-10 p-4"
            type="date"
            name="nacimiento"
            id="nacimiento"
            required
            defaultValue={defaultValues.nacimiento}
          />

          <label className=" text-gray-100" htmlFor="instagram">
            Instagram
          </label>
          <input
            required
            className="h-10 p-4"
            type="text"
            name="instagram"
            id="instagram"
            defaultValue={defaultValues.instagram}
          />
          {/* <label className=" text-gray-100" htmlFor="foto">
        Foto
      </label>
      <input className="h-10 p-0" type="file" name="foto" id="foto" /> */}
        </div>
        <div className="flex justify-center gap-5 flex-wrap align-baseline mb-20">
          <button
            className="  self-center border-2 border-gray-600 rounded-lg text-lg text-gray-100 text-center py-3  px-5 mt-3 mb-10 "
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
          <button className=" rounded-lg self-center flex justify-center items-center text-lg text-gray-100 text-center py-3 px-5 border-spacing-1 border-gray-600 border-2 mt-3 mb-10">
            {isSubmitting ? "En ello..." : "Actualizar"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default EditPeludo;

export async function loader({ request, params }) {
  const peludoId = params.id;
  const peludo = await getPeludo(peludoId);

  return peludo;
}

// action
export async function action({ request, params }) {
  const peludoId = params.id;

  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  const file = await formData.get("imageUrl");

  if (request.method === "PATCH") {
    console.log("editTime", formData);
    await updatePeludo(peludoId, userData, file);
    return redirect(`/profile/${peludoId}`);
  } else if (request.method === "DELETE") {
    await deletePeludo(peludoId);
    return redirect("/");
  }
}
