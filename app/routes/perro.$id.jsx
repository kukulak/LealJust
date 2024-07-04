import Seccion from "../components/Seccion";
import Modal from "../components/Modal";

import { useEffect, useState } from "react";
import { getCupones } from "../data/cupon.server";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Form,
  useLoaderData,
  useActionData,
  useNavigate,
  useNavigation,
  Link,
  redirect,
} from "@remix-run/react";

import { getPeludo } from "../data/peludo.server";
import { upsertUsed } from "../data/used.server";

import { getUserFromSession, updatePuntos } from "../data/auth.server";
import {
  getPaquetesPorPeludo,
  registerInPaquete,
} from "../data/paquete.server";
import DataPaquete from "../components/DataPaquete";

const Perro = () => {
  const {
    cuponesEstetica,
    cuponesGuarderia,
    cuponesHotel,
    cuponesAmigos,
    cuponesDinamicas,
    cuponesEspeciales,
    peludo,
    user,
    paquetes,
  } = useLoaderData();
  //
  const navigate = useNavigate();
  const actionClose = useActionData();

  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      console.log("EMBLE API PARA QUE", emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  const [estado, setEstado] = useState("");

  const [modalData, setModalData] = useState({
    nombre: "nombre",
    formula: "formula",
    descripcion: "descripcion",
    cuponId: "id",
  });

  const [adminButtons, setAdminButtons] = useState(true);

  const [edad, setEdad] = useState(0);

  useEffect(() => {
    const hoy = new Date();
    var cumpleanos = new Date(peludo.nacimiento);

    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    setEdad(edad);
  }, [edad, peludo.nacimiento]);

  useEffect(() => {
    if (user.role !== "ADMIN") {
      setAdminButtons(false);
    }
  }, [user]);

  useEffect(() => {
    if (actionClose) {
      setEstado(false);
    }
  }, [actionClose]);

  function closeHandler() {
    setEstado(false);
  }

  function submitHandler() {
    setEstado(false);
  }

  function openCuponHandler(nombre, descripcion, cuponId, cuponVacio) {
    setEstado(true);
    const describe = descripcion;
    setModalData({ nombre, descripcion, cuponId, cuponVacio });
    console.log(describe, "modalDATa", cuponId);
  }

  const [getImages, setImages] = useState(peludo.fotos);
  // const imagenes =

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  useEffect(() => {
    let momentImages = peludo.fotos;
    // peludo.fotos.map(({ url }) => (momentImages = { original: url }));
    setImages(momentImages);
  }, [peludo.fotos]);

  // [
  //   {
  //     thumbnail: 'imagen',
  //     original: 'imagen'},
  //   }
  // ]

  const [editando, setEditando] = useState(false);
  const [paqueteData, setPaqueteData] = useState({
    id: "",
    categoria: "",
    cantidad: "",
    usados: "",
  });

  const handleMoreDays = () => {
    console.log("one more day");
    navigate(`/crearPaquete/${peludo.id}`);
  };

  return (
    <div className="max-w-[720px]">
      <Modal estado={estado} onClose={closeHandler}>
        <div className="bg-gray-100 flex flex-col justify-center items-center p-3 rounded-2xl w-full md:w-1/2">
          <div className="rounded-xl p-5  w-[98%] bg-gray-300 ">
            {modalData.cuponVacio && (
              <div> {modalData.cuponVacio} mas para activar el cupon</div>
            )}
            <span className="text-xl">{modalData.nombre}</span>
            <p className="text-sm"> {modalData?.descripcion} </p>
          </div>

          <div className="flex mt-5 justify-evenly w-full">
            <button
              onClick={closeHandler}
              className=" hover:border-yellow-400 border-2 border-gray-100 hover:bg-gray-500 bg-[#F9AC19] p-2 px-5 rounded-xl"
            >
              {adminButtons ? <>CANCELAR</> : <>CERRAR</>}
            </button>
            {adminButtons &&
              (modalData.cuponVacio ? (
                <Form method="post" onSubmit={submitHandler}>
                  <input type="hidden" name="peludoId" value={peludo.id} />
                  <input
                    type="hidden"
                    name="cuponId"
                    value={modalData.cuponId}
                  />
                  <button
                    type="submit"
                    className=" border-yellow-400 border-2 p-2 px-5 hover:bg-yellow-400 rounded-lg"
                  >
                    Registrar
                  </button>
                </Form>
              ) : (
                <Form method="post" onSubmit={submitHandler}>
                  <input type="hidden" name="peludoId" value={peludo.id} />
                  <input
                    type="hidden"
                    name="cuponId"
                    value={modalData.cuponId}
                  />

                  <button
                    type="submit"
                    className=" border-yellow-400 border-2 p-2 px-5 hover:bg-yellow-400 rounded-lg"
                  >
                    USAR
                  </button>
                </Form>
              ))}
          </div>
        </div>
      </Modal>

      <div className="text-gray-900 mt-10 ">
        <div className="mb-10  flex items-center flex-col">
          {/* <Link
            className="text-gray-300 border-2 border-gray-500 px-5 py-3 rounded-md"
            to={`/humanPerro/${clienteId}`}
          >
            Volver
          </Link> */}
          <button
            className="text-gray-300 border-2 border-gray-500 mb-3 px-3 py-1 rounded-md"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>

          {/* <ImageFitFill src={peludo.foto} alt="Foto de tu perrito" /> */}
          {/* <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              <div className="embla__slide"> uno </div>
              <div className="embla__slide"> dos </div>
              <div className="embla__slide"> tres </div>
            </div>
          </div> */}

          <div className="embla rounded-xl" ref={emblaRef}>
            <div className="embla__container">
              {peludo.fotos.map((foto) => (
                <img
                  className="embla__slide"
                  src={foto.url}
                  key={foto.id}
                  alt="foto de tu perrito"
                />
              ))}
            </div>
          </div>

          {/* <ImageGallery items={images} /> */}
          {/* <Carrusel images={peludo.fotos} /> */}

          <div className="pt-6 -mt-1 bg-gray-200 w-10/12  pb-6 pl-7 pr-5 rounded-b-lg">
            {" "}
            <p className="text-center leading-none text-3xl font-thin -mt-4">
              ^
            </p>
            <p className="mt-3 first-letter:uppercase text-3xl">
              {peludo.nombre}
            </p>
            <p className="first-letter:uppercase"> {peludo.raza} </p>
            {paquetes && !editando ? (
              <>
                <p className="text-xs mt-3"> Paquetes activos </p>{" "}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  {paquetes.map((paquete) => (
                    <DataPaquete
                      user={user.role}
                      paquete={paquete}
                      key={paquete.id}
                      editando={setEditando}
                      openPaquete={setPaqueteData}
                    />
                  ))}
                </div>
              </>
            ) : (
              <Form
                onSubmit={() => setEditando(false)}
                method="patch"
                className="mt-5"
                key={paqueteData.id}
              >
                {" "}
                <div className="w-full bg-gray-800 rounded-lg text-gray-300 p-5 ">
                  <p>
                    Registrar días, máximo puedes registrar{" "}
                    {paqueteData.cantidad - paqueteData.usados}{" "}
                  </p>
                  {/* <p className="text-gray-300">Cantidad</p> */}
                  <input
                    id="usados"
                    name="usados"
                    className="text-gray-800 text-center p-4 w-full my-1 text-2xl"
                    min="1"
                    max={paqueteData.cantidad - paqueteData.usados}
                    type="number"
                    defaultValue={1}
                    // defaultValue={defaultValues.cantidad}
                    required
                  />
                </div>
                <input
                  type="text"
                  id="paqueteId"
                  name="paqueteId"
                  hidden
                  value={paqueteData.id}
                />
                <div className="flex-wrap text-gray-200 mt-1  mb-2 form-actions flex flex-row justify-between   ">
                  <Link
                    onClick={() => setEditando(false)}
                    className="bg-gray-800 w-[49%]  text-center p-2 rounded-lg"
                  >
                    {" "}
                    Cerrar{" "}
                  </Link>

                  <button
                    className="border-gray-300 w-[49%] text-center rounded-lg border bg-darkest py-2 "
                    // onClick={() => handleShare(true)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Actualizando..." : "Actualizar"}
                  </button>
                </div>
              </Form>
            )}
            {user.role === "ADMIN" && (
              <button
                onClick={handleMoreDays}
                className=" text-xs rounded-lg mt-4  bg-[#F9AC19] px-3 mb-5 py-2"
              >
                Agregar Paquete
              </button>
            )}
            <div className="  my-5">
              <p className=" text-xs text-gray-700"> Activo desde</p>
              <p className="text-xl"> {peludo.nacimiento} </p>
            </div>
            <div className="my-5 flex gap-5">
              {edad > 0 && (
                <div>
                  <p className=" text-xs text-gray-700"> Edad</p>
                  <p className="text-xl"> {edad} </p>
                </div>
              )}
              <div>
                <p className=" text-xs text-gray-700"> Amigos</p>
                <p className="text-xl"> 3 </p>
              </div>
            </div>
            {peludo.instagram && (
              <div className="my-5">
                <p className=" text-xs text-gray-700"> instagram</p>

                <p className=" text-xl text-gray-700"> {peludo.instagram} </p>
              </div>
            )}
            <div className=" -mt-16 flex items-end justify-between">
              {user.role === "ADMIN" ? (
                <Link
                  className="-ml-2 px-3 py-2 rounded-xl bg-[#F9AC19] text-sm"
                  to={`/editPeludo/${peludo.id}`}
                >
                  {" "}
                  EDITAR{" "}
                </Link>
              ) : (
                <Link
                  className="-ml-2 px-3 py-2 rounded-xl bg-[#F9AC19] text-sm"
                  href="/invitar"
                >
                  {" "}
                  Invitar Amigos{" "}
                </Link>
              )}

              {peludo.qrCode && (
                <div>
                  <img className="w-30 h-30" src={peludo.qrCode} alt="qrCode" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-20">
        {cuponesEspeciales.length > 0 && (
          <Seccion
            user={user}
            promociones={cuponesEspeciales.map((cupon) => cupon.nombre)}
            descripcion={cuponesEspeciales.map((cupon) => cupon.descripcion)}
            formula={cuponesEspeciales.map((cupon) => cupon.formula)}
            cuponId={cuponesEspeciales.map((cupon) => cupon.id)}
            titulo={cuponesEspeciales[0]?.categoria}
            onClick={openCuponHandler}
            visitsRemaining={cuponesEspeciales.map(
              (cupon) => cupon.visitsRequired,
            )}
          />
        )}

        {cuponesEstetica.length > 0 && (
          <Seccion
            user={user}
            promociones={cuponesEstetica.map((cupon) => cupon.nombre)}
            descripcion={cuponesEstetica.map((cupon) => cupon.descripcion)}
            formula={cuponesEstetica.map((cupon) => cupon.formula)}
            cuponId={cuponesEstetica.map((cupon) => cupon.id)}
            titulo={cuponesEstetica[0]?.categoria}
            onClick={openCuponHandler}
            visitsRemaining={cuponesEstetica.map(
              (cupon) => cupon.visitsRequired,
            )}
          />
        )}
        {cuponesGuarderia.length > 0 && (
          <Seccion
            user={user}
            promociones={cuponesGuarderia.map((cupon) => cupon.nombre)}
            descripcion={cuponesGuarderia.map((cupon) => cupon.descripcion)}
            cuponId={cuponesGuarderia.map((cupon) => cupon.id)}
            titulo={cuponesGuarderia[0]?.categoria}
            // visitsRemaining={4}
            visitsRemaining={cuponesGuarderia.map(
              (cupon) => cupon.visitsRequired,
            )}
            onClick={openCuponHandler}
          />
        )}
        {cuponesHotel.length > 0 && (
          <Seccion
            user={user}
            promociones={cuponesHotel.map((nombre) => nombre.nombre)}
            descripcion={cuponesHotel.map((cupon) => cupon.descripcion)}
            cuponId={cuponesHotel.map((cupon) => cupon.id)}
            titulo={cuponesHotel[0]?.categoria}
            // visitsRemaining={4}
            visitsRemaining={cuponesHotel.map((cupon) => cupon.visitsRequired)}
            onClick={openCuponHandler}
          />
        )}
        {cuponesAmigos.length > 0 && (
          <Seccion
            user={user}
            promociones={cuponesAmigos.map((nombre) => nombre.nombre)}
            descripcion={cuponesAmigos.map((cupon) => cupon.descripcion)}
            cuponId={cuponesAmigos.map((cupon) => cupon.id)}
            titulo={cuponesAmigos[0]?.categoria}
            onClick={openCuponHandler}
            visitsRemaining={cuponesAmigos.map((cupon) => cupon.visitsRequired)}
          />
        )}

        {cuponesDinamicas.length > 0 && (
          <Seccion
            user={user}
            promociones={cuponesDinamicas.map((nombre) => nombre.nombre)}
            descripcion={cuponesDinamicas.map((cupon) => cupon.descripcion)}
            cuponId={cuponesDinamicas.map((cupon) => cupon.id)}
            titulo={cuponesDinamicas[0]?.categoria}
            onClick={openCuponHandler}
            visitsRemaining={cuponesDinamicas.map(
              (cupon) => cupon.visitsRrequired,
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Perro;

export async function loader({ params, request }) {
  const peludoId = params.id;
  const paquetes = await getPaquetesPorPeludo(peludoId);
  const user = await getUserFromSession(request);
  const cuponesEstetica = await getCupones("Estética", peludoId);
  const cuponesGuarderia = await getCupones("Guardería", peludoId);
  const cuponesHotel = await getCupones("Hotel", peludoId);
  const cuponesAmigos = await getCupones("Amigos", peludoId);
  const cuponesDinamicas = await getCupones("Dinámicas", peludoId);
  const cuponesEspeciales = await getCupones("Especiales", peludoId);

  const peludo = await getPeludo(peludoId);
  // console.log(cuponesGuarderia, "CUPONESGUARDERIA");
  return {
    cuponesEstetica,
    cuponesGuarderia,
    cuponesHotel,
    cuponesAmigos,
    cuponesDinamicas,
    cuponesEspeciales,
    peludo,
    user,
    paquetes,
  };
}

export async function action({ params, request }) {
  const formData = await request.formData();
  // const { userId } = getUserFromSession(request);
  const cuponData = Object.fromEntries(formData);
  console.log("CUPON DATA", cuponData);
  const paqueteId = cuponData.paqueteId;
  const diasUsados = cuponData.usados;
  const cuponId = cuponData.cuponId;
  const peludoId = cuponData.peludoId;
  if (paqueteId) {
    console.log("PAQUETE ID EXISTING", paqueteId);
    await registerInPaquete(params.id, paqueteId, diasUsados);
    return true;
  }

  if (cuponId) {
    await updatePuntos(peludoId, 10);
    await upsertUsed(cuponId, peludoId);
    // await registerVisit(peludoId, cuponId)
    return true;
  }
  return true;
}
