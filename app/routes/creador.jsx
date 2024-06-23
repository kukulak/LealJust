import { Form, Link, redirect, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { requireUserSession } from "../data/auth.server";
import { newCupon } from "../data/cupon.server";
import { getCategorias } from "../data/categoria.server";
import CuponesForm from "../components/auth/CuponesForm";
import { getFormula } from "../data/formula.server";

const Creador = () => {
  const { categorias, promociones } = useLoaderData();

  return (
    <div className="w-full  flex justify-center items-center flex-col pt-10">
      <div className="w-1/2 md:w-2/5"></div>

      <p className="mb-14">Llena el formulario para crear cupones</p>
      {categorias && (
        <CuponesForm categorias={categorias} promociones={promociones} />
      )}
      <Link
        className=" bg-gray-800 w-[150px] self-center text-2xl text-gray-100 text-center p-3 mt-10 mb-20 "
        to="/"
      >
        {" "}
        Regresar{" "}
      </Link>
    </div>
  );
};

export default Creador;

export async function action({ request }) {
  const userId = await requireUserSession(request);
  console.log(userId.userId, "by REQUEST");

  const formData = await request.formData();
  const dataCupon = Object.fromEntries(formData);
  try {
    // dataCupon.oferta = dataCupon.formula
    await newCupon(dataCupon, userId.userId);
    console.log("action processed", dataCupon);
    return redirect("/");
  } catch (error) {
    console.log(error);
    if (error.status === 422) {
      return { dataCupon: error.message };
    } else {
      return { dataCupon: error.message };
    }
  }
}

export async function loader({ request }) {
  const categorias = await getCategorias();
  const promociones = await getFormula();
  console.log("promociones", promociones);
  // const allLikes = await getAllLikes()
  // dreams.forEach(id =>
  //   console.log(
  //     'FROM Dashboard Dreams',
  //     (id.isAuthor = id.authorId === userId),
  //     id.authorId,
  //     userId
  //   )
  // )

  return { categorias, promociones };
}
