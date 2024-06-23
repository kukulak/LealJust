import {
  Form,
  useNavigation,
  useNavigate,
  redirect,
  useLoaderData,
} from "@remix-run/react";
//
import imageCompression from "browser-image-compression";

// import imagemin from "imagemin";
// import imageminJpegtran from "imagemin-jpegtran";
// import imageminMozjpeg from "imagemin-mozjpeg";
// import imageminPngquant from "imagemin-pngquant";
// import imageminGifsicle from "imagemin-gifsicle";
// import fetch from "node-fetch";
// import Compressor from "compressorjs";

import { deletePeludo, getPeludo, updatePeludo } from "../data/peludo.server";
import { ImageUploader } from "../components/ImageUploader";
import { useState } from "react";

const EditPeludo = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
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
      console.log("IMAGEURL in HANDLER", imageUrl);

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
    <div className=" max-w-[700px]  w-full items-center flex flex-col gap-0">
      <ImageUploader
        onChange={HandleFileUpload}
        imageUrl={formData.peludoPicture}
        existedImage={defaultValues.foto}
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
  const peludo = await getPeludo(peludoId);

  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  let file = "";
  if (peludo.foto !== userData.foto) {
    file = await formData.get("imageUrl");
  }

  if (request.method === "PATCH") {
    console.log("editTime", formData);
    await updatePeludo(peludoId, userData, file);
    return redirect(`/perro/${peludoId}`);
  } else if (request.method === "DELETE") {
    await deletePeludo(peludoId);
    return redirect("/");
  }
}
