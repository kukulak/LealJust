// import { QRCode } from "react-qrcode-logo";
// import Seccion from "../components/Seccion";
// import Modal from "../components/Modal";
// import UrlCreator from "../util/UrlCreator";
// import { useEffect, useState } from "react";
// import { getCupones } from "../data/cupon.server";

// // import Carrusel from "../components/Carrusel";
// import ImageFitFill from "../components/ImageFitFill";
// import {
//   Form,
//   useLoaderData,
//   useActionData,
//   useNavigate,
//   Link,
// } from "@remix-run/react";

// import { getPeludo } from "../data/peludo.server";
// import { upsertUsed } from "../data/used.server";

// import { getUserFromSession, updatePuntos } from "../data/auth.server";

const Perro = () => {
  // const {
  //   cuponesEstetica,
  //   cuponesGuarderia,
  //   cuponesHotel,
  //   cuponesAmigos,
  //   cuponesDinamicas,
  //   cuponesEspeciales,
  //   peludo,
  //   user,
  // } = useLoaderData();

  // const navigate = useNavigate();

  // const actionClose = useActionData();

  // const url = UrlCreator(peludo.id);

  // const [estado, setEstado] = useState("");

  // const [modalData, setModalData] = useState({
  //   nombre: "nombre",
  //   formula: "formula",
  //   descripcion: "descripcion",
  //   cuponId: "id",
  // });

  // const [adminButtons, setAdminButtons] = useState(true);

  // useEffect(() => {
  //   if (user.role !== "ADMIN") {
  //     setAdminButtons(false);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (actionClose) {
  //     setEstado(false);
  //   }
  // }, [actionClose]);

  // function closeHandler() {
  //   setEstado(false);
  // }

  // function submitHandler() {
  //   setEstado(false);
  // }

  // function openCuponHandler(nombre, descripcion, cuponId, cuponVacio) {
  //   setEstado(true);
  //   const describe = descripcion;
  //   setModalData({ nombre, descripcion, cuponId, cuponVacio });
  //   console.log(describe, "modalDATa", cuponId);
  // }

  return (
    <div className="max-w-[720px]">
      NO RTIENE NADA
      {/* <Modal estado={estado} onClose={closeHandler}>
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
      </Modal> */}
      <div className="text-gray-900 mt-10 ">
        <div className="mb-10  flex items-center flex-col">
          {/* <Link
            className="text-gray-300 border-2 border-gray-500 px-5 py-3 rounded-md"
            to={`/humanPerro/${clienteId}`}
          >
            Volver
          </Link> */}
          <button
            className="text-gray-300 border-2 border-gray-500 px-5 py-3 rounded-md"
            // onClick={() => navigate(-1)}
          >
            Volver
          </button>

          {/* {peludo.fotos.map(img => (
            <img
              key={img.id}
              alt="Foto de tu perrito"
              src={img.url}
              className=" object-cover max-h-96 z-10 shadow-2xl shadow-black/50 w-11/12 rounded-xl mt-4"
            />
          ))} */}

          {/* <Flicking
            renderOnlyVisible={true}
            align="prev"
            circular={true}
            onMoveEnd={e => {
              console.log(e)
            }}
          > */}
          {/* {peludo.fotos.map(({ img, index }) => (
              <img src={img} alt={img} key={index + img} />
            ))} */}
          {/* <div className="w-full h-52 bg-gray-800"> UNO </div>
            <div className="w-full h-52 bg-gray-900"> DOS </div>
            <div className="w-full h-52 bg-gray-950"> TRES </div> */}
          {/* </Flicking> */}

          {/* <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
          >
            <Slider>
              {peludo.fotos.map(({ url, index }) => (
                <Slide index={index} key={index + url}>
                  <img src={url} alt={url} />
                </Slide>
              ))}
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </CarouselProvider> */}

          {/* <Carrusel images={peludo.fotos} /> */}

          {/* <Slider {...settings}>
            {peludo.fotos.map((foto, index) => (
              <div key={index}>
                <img src={foto.url} alt={`peludo-${index}`} />
              </div>
            ))}
          </Slider> */}
          {/* 
          {console.log("TODAS LAS FOTOS", peludo.fotos)} */}

          {/* <ImageFitFill src={peludo.foto} alt="Foto de tu perrito" /> */}

          <div className="pt-6 -mt-1 bg-gray-200 w-10/12  py-3 pl-4 pr-2 rounded-b-lg">
            {" "}
            <p className="text-center leading-none text-3xl font-thin -mt-4">
              ^
            </p>
            {/* <p className=" first-letter:uppercase text-3xl">{peludo.nombre}</p> */}
            {/* <p className="first-letter:uppercase"> {peludo.raza} </p> */}
            <div className="  my-5">
              {/* <p className=" text-xs text-gray-700"> Activo desde</p> */}
              {/* <p className="text-xl"> {peludo.nacimiento} </p> */}
            </div>
            <div className="my-5">
              <p className=" text-xs text-gray-700"> Amigos</p>
              <p className="text-xl"> 10</p>
            </div>
            {/* {peludo.instagram && (
              <div className="my-5">
                <p className=" text-xs text-gray-700"> instagram</p>

                <p className=" text-xl text-gray-700"> {peludo.instagram} </p>
              </div>
            )} */}
            <div className=" -mt-16 flex items-end justify-between">
              {/* {user.role === "ADMIN" ? (
                <Link
                  className=" px-3 py-2 rounded-xl bg-[#F9AC19] text-sm"
                  to={`/editPeludo/${peludo.id}`}
                >
                  {" "}
                  EDITAR{" "}
                </Link>
              ) : (
                <Link
                  className=" px-3 py-2 rounded-xl bg-[#F9AC19] text-sm"
                  href="/invitar"
                >
                  {" "}
                  Invitar Amigos{" "}
                </Link>
              )} */}
              {/* <QRCode
                size="120"
                removeQrCodeBehindLogo="true"
                logoImage="/logo/lo-vert-JustLikeHome-small-black.png"
                logoWidth="30"
                logoHeight="23"
                bgColor="#ffffff"
                ecLevel="H"
                // value="https://github.com/gcoro/react-qrcode-logo"
                value={url}
                qrStyle="dots"
                logoPadding="5"
                eyeRadius={[
                  [5, 5, 5, 5], // top/left eye
                  [5, 5, 5, 5], // top/right eye
                  [5, 5, 5, 5], // bottom/left
                ]}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col mb-20">
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
      </div> */}
    </div>
  );
};

export default Perro;

// export async function loader({ params, request }) {
//   const peludoId = params.id;
//   const user = await getUserFromSession(request);
//   const cuponesEstetica = await getCupones("Estética", peludoId);
//   const cuponesGuarderia = await getCupones("Guardería", peludoId);
//   const cuponesHotel = await getCupones("Hotel", peludoId);
//   const cuponesAmigos = await getCupones("Amigos", peludoId);
//   const cuponesDinamicas = await getCupones("Dinámicas", peludoId);
//   const cuponesEspeciales = await getCupones("Especiales", peludoId);

//   const peludo = await getPeludo(peludoId);
//   // console.log(cuponesGuarderia, "CUPONESGUARDERIA");
//   return {
//     cuponesEstetica,
//     cuponesGuarderia,
//     cuponesHotel,
//     cuponesAmigos,
//     cuponesDinamicas,
//     cuponesEspeciales,
//     peludo,
//     user,
//   };
// }

// export async function action({ request }) {
//   const formData = await request.formData();
//   // const { userId } = getUserFromSession(request);
//   const cuponData = Object.fromEntries(formData);
//   const cuponId = cuponData.cuponId;
//   const peludoId = cuponData.peludoId;
//   console.log("CUPON ID", cuponId);
//   console.log("PELUDO ID", peludoId);
//   if (cuponId) {
//     await updatePuntos(peludoId, 10);
//     await upsertUsed(cuponId, peludoId);
//     // await registerVisit(peludoId, cuponId)
//     return true;
//   }
//   return true;
// }
