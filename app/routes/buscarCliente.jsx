import BusquedaForm from "../components/BusquedaForm";
import PeludoList from "../components/PeludoList";
import HumanoList from "../components/HumanoList";
import { getPeludoByName } from "../data/peludo.server";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { getHumanoByName, requireUserSession } from "../data/auth.server";
import { useEffect, useState } from "react";

import buscar from "/img/goSearch.png";

const SearchBack = () => {
  return (
    <Link className="flex items-center mb-2 justify-center" to="/buscarCliente">
      <p className="flex gap-2 mt-6 flex-row flex-wrap text-lg">
        <img className="w-3 h-3 mt-2" src={buscar} alt="buscar" />
        <p>Regresar</p>
      </p>
    </Link>
  );
};

const BuscarCliente = () => {
  const actionData = useActionData();
  // const loaderData = useLoaderData()
  console.log("PELUDeOS", actionData?.especie);

  const [especie, setEspecie] = useState(actionData?.especie);

  useEffect(() => {
    setEspecie(actionData?.especie);
  }, [actionData?.especie]);

  return (
    <div className="flex content-center justify-center h-screen mt-14 align-middle">
      <div className="flex  content-center items-center flex-col w-12/12  ">
        <p>Busca por humano o por perro </p>

        {!especie && <BusquedaForm />}
        {/* 
        {actionData?.especie === 'peludo' ? (
          <PeludoList lista={actionData?.nombre} />
        ) : (
          <HumanoList lista={actionData?.nombre} />
        )} */}
        <section className="text-lg mt-0 mb-5">
          {actionData?.especie === "humano" && (
            <>
              <div>
                {actionData?.nombre.length >= 1 ? (
                  <div className="text-2xl">
                    <SearchBack />
                    Resultados{" "}
                  </div>
                ) : (
                  <div className="flex flex-col h-[80vh] items-center justify-center">
                    <div className="text-xl">
                      {" "}
                      Nombre de Humano no encontrado
                    </div>
                    <SearchBack />
                  </div>
                )}{" "}
              </div>
            </>
          )}

          {actionData?.especie === "peludo" && (
            <>
              <div>
                {actionData?.nombre.length >= 1 ? (
                  <div className="text-2xl">
                    {" "}
                    <SearchBack /> Resultados
                  </div>
                ) : (
                  <div className="text-xl flex flex-col h-[80vh] items-center justify-center">
                    {" "}
                    Nombre de perrito no encontrado <SearchBack />
                  </div>
                )}{" "}
              </div>
            </>
          )}
        </section>
        {actionData?.especie && (
          <div className="flex content-center flex-col flex-wrap gap-3 w-full justify-start pb-52 ">
            {actionData?.especie === "peludo"
              ? actionData?.nombre.map((peludo) => (
                  <Link
                    className=" bg-gray-900 p-5 hover:bg-gray-800 flex gap-5 items-center"
                    to={`/perro/${peludo.id}`}
                    key={peludo.id}
                  >
                    <img
                      className="w-10 h-10 rounded-full object-fill"
                      src={peludo.fotos[0].url}
                      alt="dog"
                    />
                    <p className=" first-letter:uppercase">{peludo.nombre}</p>
                    <p className=" text-xs font-extralight">{peludo.raza}</p>
                  </Link>
                ))
              : actionData?.nombre.map((humano) => (
                  <Link
                    className=" bg-gray-900 p-5 flex  hover:bg-gray-800 gap-2 items-center"
                    to={`/humanProfile/${humano.id}`}
                    key={humano.id}
                  >
                    <p className=" first-letter:uppercase">{humano.name}</p>
                    <p className=" text-xs font-extralight">{humano.email}</p>
                  </Link>
                ))}
            {actionData?.nombre.length > 1 && <SearchBack />}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarCliente;

export async function action({ request }) {
  const formData = await request.formData();
  const dataSearch = Object.fromEntries(formData);
  const especie = dataSearch.especie;
  let nombre = {};
  try {
    if (dataSearch.especie === "peludo") {
      nombre = await getPeludoByName(dataSearch.nombre);

      console.log(dataSearch.nombre, nombre);
      console.log(dataSearch.especie, especie);
      return { nombre, especie };
    } else {
      nombre = await getHumanoByName(dataSearch.nombre);
      console.log(dataSearch.nombre);
      return { nombre, especie };
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function loader({ request }) {
//   const formData = await request.formData()
//   const dataSearch = Object.fromEntries(formData)
//   const especie = dataSearch.especie

//   return especie
// }

export async function loader({ request }) {
  // const allPeludos = await getAllPeludos()
  // const user = await getUserFromSession(request)
  const user = await requireUserSession(request);

  return user;
}
