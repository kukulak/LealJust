import { useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { deleteImage } from "../data/s3.server";
import { prisma } from "../data/database.server";

import { deleteImageReference, listImages } from "../data/foto.server";

const DeleteImages = () => {
  //
  const { images } = useLoaderData();
  const fetcher = useFetcher();

  const handleDelete = (imageKey) => {
    if (
      confirm(
        "Are you sure you want to delete this image? This action is final.",
      )
    ) {
      console.log("HANDLEDELETE", imageKey);
      const formData = new FormData();
      formData.append("imageKey", imageKey);
      fetcher.submit(formData, { method: "post", action: "/deleteImages" });
    }
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="image-gallery flex flex-wrap ">
        {images.map((image) => (
          <div
            key={image.key}
            className="image-item border-[0.5px] border-gray-500 p-5 m-5 w-1/3 flex flex-col "
          >
            <img src={image.url} alt={image.key} />
            <button
              className="bg-red-600  p-3 my-2 "
              onClick={() => handleDelete(image.key)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteImages;

export const loader = async () => {
  const images = await listImages();
  return json({ images });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const imageKey = formData.get("imageKey");

  // await deleteImage(imageKey);
  // await deleteImageReference(imageKey);

  console.log("IMAGEKEY:", imageKey);

  // Obtener la URL de la imagen antes de eliminarla de la base de datos

  const image = await prisma.foto.findUnique({
    where: { id: imageKey },
  });

  console.log("FINDUNIQUE", image);
  if (image) {
    await deleteImage(image.url.split("/").pop()); // Obtener solo la clave de la URL
    await deleteImageReference(imageKey);
  }

  return json({ success: true });
};
