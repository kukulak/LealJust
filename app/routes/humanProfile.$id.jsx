import Modal from "../components/Modal";

import { useState } from "react";

import {
  Link,
  redirect,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import {
  deleteUser,
  getUser,
  getUserFromSession,
  requireUserSession,
  updateUser,
} from "../data/auth.server";
import { getAllPeludosByUser } from "../data/peludo.server";
import PeludoOnHuman from "../components/PeludoOnHuman";

import ProfileForm from "../components/auth/ProfileForm";

const HumanProfile = () => {
  const { humano, peludos, humanoId } = useLoaderData();

  const { setClienteId } = useOutletContext();

  console.log("El ID a usar", humanoId);

  const [estado, setEstado] = useState(false);

  console.log("ESTADO", estado);

  function closeHandler() {
    // console.log('cerrado')
    setEstado(!estado);
  }

  function openModalHandler() {
    setEstado(true);
  }

  const changeContext = () => {
    setClienteId(humanoId);
  };

  return (
    <div className="mt-10">
      <Modal onClose={closeHandler} estado={estado}>
        <ProfileForm />
      </Modal>
      <div className="text-gray-900">
        <div className="mb-10 flex items-center flex-col">
          <div className="flex flex-wrap w-9/12 md:w-10/12 justify-center items-center mb-10 gap-3">
            <div className="rounded-full flex w-[60px] h-[60px] self-end bottom  bg-gray-500 overflow-hidden  z-10 shadow-black/0 shadow-2xl justify-center items-center -mr-7">
              {humano.foto ? (
                <img
                  alt="Foto de tu humano"
                  src="/img/portrait-of-a-businesswoman-standing-in-an-office-2023-11-27-05-11-19-utc.png"
                  className=" object-cover h-[100%]"
                />
              ) : (
                <p className=" uppercase text-2xl text-gray-200 ">
                  {" "}
                  {humano.name[0]}.{" "}
                </p>
              )}
            </div>
            {peludos.length > 0 &&
              peludos.map((peludo, index) => (
                <Link
                  style={{ zIndex: index + 10 }}
                  key={peludo.id}
                  to={`/profile/${peludo.id}`}
                  className=" hover:z-40 rounded-full flex w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-gray-500 overflow-hidden mt-4 z-10 shadow-black/50 shadow-2xl -mr-7"
                  onClick={changeContext}
                >
                  <img
                    alt="Foto de tu perrito"
                    src={peludo.foto}
                    className=" object-cover w-[60px] md:w-[130px]"
                  />
                </Link>
              ))}

            <Link
              className="rounded-full justify-center items-center flex w-[40px] h-[40px] md:w-[40px] md:h-[40px] bg-gray-300 overflow-hidden mt-4 z-10 shadow-black/50 shadow-2xl ml-7"
              to="/newPeludo"
              onClick={changeContext}
            >
              {" "}
              <p className="text-[40px] -mt-1">+</p>
            </Link>
          </div>

          <div className="  min-w-60  pt-6 -mt-1 bg-gray-200   p-5 rounded-lg">
            {" "}
            <section className="flex flex-col flex-wrap gap-5 justify-between">
              <div>
                <p className="first-letter:uppercase text-3xl">{humano.name}</p>
                <p className="text-gray-700"> {humano.email} </p>
              </div>
              <div className=" flex flex-col justify-center text-left my-5">
                <p className=" text-xs text-gray-700"> Activo desde</p>
                <p className="text-xl">
                  {" "}
                  {new Date(humano.createdAt).toLocaleDateString("es-MX")}
                </p>
              </div>
              <div>
                {" "}
                <p> Puntos acumulados </p>{" "}
                <p className="text-2xl font-bold">{humano.puntos}</p>
              </div>
            </section>
            <div className="mt-12 ">
              {humano.whatsapp && (
                <div className="flex gap-5">
                  <p className="text-sm">Whatsapp:</p>
                  <span> {humano.whatsapp} </span>
                </div>
              )}
              {humano.colonia && (
                <div className="flex gap-5">
                  <p className="text-sm">Colonia: </p>{" "}
                  <span className="first-letter:uppercase">
                    {" "}
                    {humano.colonia}{" "}
                  </span>
                </div>
              )}
              {humano.municipio && (
                <div className="flex gap-5">
                  <p className="text-sm">Municipio:</p>
                  <span className="first-letter:uppercase">
                    {" "}
                    {humano.municipio}{" "}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={openModalHandler}
              className=" bg-yellow-400 mt-6 w-20 justify-center flex "
            >
              Editar
            </button>
          </div>

          <section className="flex flex-wrap gap-5 justify-center">
            {peludos.length >= 0 &&
              peludos.map((peludo) => (
                <PeludoOnHuman
                  key={peludos.id}
                  foto={peludo.foto}
                  nombre={peludo.nombre}
                  peludoId={peludo.id}
                  onClick={changeContext}
                />
              ))}
          </section>

          <Link
            to="/newPeludo"
            className=" flex flex-col justify-center items-center mt-10 px-6 py-4"
            onClick={changeContext}
          >
            <div className=" w-[120px] h-[120px]  bg-gray-400 flex flex-col justify-center items-center ">
              {" "}
              <p className="text-[100px] -mt-3 ">+</p>
            </div>
            <p className="text-xl text-gray-400 my-3"> Agregar Lomito</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HumanProfile;

export async function loader({ request, params }) {
  const humanoId = params.id;
  if (humanoId === "undefined") {
    return redirect("/login");
  }
  const humano = await getUser(humanoId);
  // const user = await getUserFromSession(request)
  const user = await requireUserSession(request);

  const peludos = await getAllPeludosByUser(humanoId);
  try {
    if (user.role !== "ADMIN") {
      if (user.userId !== humanoId) {
        console.log("USERIDACTION");
        return redirect(`/humanProfile/${user.userId}`);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return { humano, peludos, user, humanoId };
}

// action
export async function action({ request, params }) {
  const humanoId = params.id;
  const user = await getUserFromSession(request);

  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  try {
    if (user.role !== "ADMIN") {
      if (user.userId !== humanoId) {
        console.log("USERIDACTION");
        return redirect("/");
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (request.method === "PATCH") {
    console.log("editTime");
    await updateUser(humanoId, userData);
    return redirect(`/humanProfile/${humanoId}`);
  } else if (request.method === "DELETE") {
    await deleteUser(humanoId);
    return redirect("/");
  }
}
