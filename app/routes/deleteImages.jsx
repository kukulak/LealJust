import { deleteImage } from "../data/s3.server";

import { useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";

const DeleteImages = () => {
  const { images } = useLoaderData();
  const fetcher = useFetcher();

  const handleDelete = (imageKey) => {
    if (
      confirm(
        "Are you sure you want to delete this image? This action is final.",
      )
    ) {
      fetcher.submit({ imageKey }, { method: "DELETE", action: "/api/images" });
    }
  };
  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="image-gallery">
        {images.map((image) => (
          <div key={image.key} className="image-item">
            <img src={image.url} alt={image.key} />
            <button onClick={() => handleDelete(image.key)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteImages;

export const loader = async () => {
  const response = await fetch("/api/images");
  const data = await response.json();
  return json(data);
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const imageKey = formData.get("imageKey");

  const response = await fetch(`/api/images`, {
    method: "DELETE",
    body: formData,
  });

  return json(await response.json());
};
