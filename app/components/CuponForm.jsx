import { useEffect, useRef, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
  useNavigate,
} from "@remix-run/react";

// import { useLoaderData } from '@remix-run/react'
function CuponForm({ categorias, promociones, cuponData }) {
  // useNavigate
  const navigate = useNavigate();
  const navigation = useNavigation();

  const defaultValues = cuponData
    ? {
        nombre: cuponData.nombre,
        oferta: cuponData.oferta,
        descripcion: cuponData.descripcion,
        fecha: cuponData.fecha,
        categoria: cuponData.categoria,
        servicio: cuponData.servicio,
        visitsRequired: cuponData.visitsRequired,
        activo: cuponData.activo,
        formulaData: cuponData.formulaData,
        inicio: cuponData.inicio,
        termino: cuponData.termino,
      }
    : {
        nombre: "",
        descripcion: "",
        fecha: "",
        categoria: "",
        servicio: "",
        activo: "",
        oferta: "",
        visitsRequired: 1,
        inicio: "",
        termino: "",
      };

  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  // const cuponData = useLoaderData()
  const matches = useMatches();
  // console.log(matches)
  const params = useParams();
  const btn = useRef();
  const [share, setShare] = useState(true);

  const handleShare = (tof) => {
    const trueShare = tof;
    setShare(trueShare);
    navigate("/");
    // navigation('/')
  };

  const [changeValuePromocion, setChangeValuePromocion] = useState(
    defaultValues.oferta,
  );

  const [getFormulaData, setGetFormulaData] = useState("");

  // let d1 = ''
  // let d2 = ''
  // const formula = defaultValues.formulaData
  // const indeX = formula.indexOf(' X ')
  // const d1 = formula.slice(0, indeX).trim()
  // const d2 = formula.slice(indeX + 1 + indeX, formula.length).trim()

  // console.log('separar formula data FUERA DE EFFEcT', d1, ' X ', d2)

  const [dataUno, setDataUno] = useState("");
  const [dataDos, setDataDos] = useState("");

  const [changeValue, setChangeValue] = useState(defaultValues.categoria);

  const handleFormulaData = (event) => {
    let uno = dataUno;
    let dos = dataDos;

    if (event.target.name === "dataUno") {
      uno = event.target.value;
      setDataUno(uno);
    }
    if (event.target.name === "dataDos") {
      dos = event.target.value;
      setDataDos(dos);
    }

    const signo = " X ";

    const formulaData = uno + signo + dos;

    setGetFormulaData(formulaData);

    console.log("EVENT TARGET", formulaData);
  };

  useEffect(() => {
    if (defaultValues.formulaData) {
      if (
        defaultValues.oferta === "bogo" ||
        defaultValues.oferta === "unoporuno"
      ) {
        let d1 = "";
        let d2 = "";
        const formula = defaultValues.formulaData;
        const indeX = formula.indexOf(" X ");
        d1 = formula.slice(0, indeX).trim();
        d2 = formula.slice(indeX + 2, formula.length).trim();

        setDataUno(d1);
        setDataDos(d2);

        console.log("separar formula data", d1, " X ", d2);
      } else {
        console.log("no separar formula data");
      }
    }
  }, [defaultValues.formulaData, defaultValues.oferta, setDataUno, setDataDos]);

  const handleChangePromocion = (event) => {
    let index = event.target.selectedIndex;
    setChangeValuePromocion(event.target.options[index].value);
  };

  const handleChange = (event) => {
    let index = event.target.selectedIndex;
    setChangeValue(event.target.options[index].value);
  };

  // const cupons = matches.find(match => match.id === 'routes/editCupon')
  // const cupons = matches.find(match => match.id === 'routes/editCupon').data

  // const cuponData = cupons && cupons.find(cupon => cupon.id === params.id)

  // const cuponData = cupons.cupon
  console.log(
    "cuponsSSSSSS",
    new Date(cuponData.inicio).toISOString().split("T")[0],
    new Date(cuponData.termino).toISOString().split("T")[0],
  );

  // if (params.id && !cuponData) {
  //   return (
  //     <main>
  //       <p className="text-light">Dream id not found</p>
  //       <Link to="..">Go back</Link>
  //     </main>
  //   )
  // }

  const isSubmitting = navigation.state !== "idle";

  const [activar, setActivar] = useState(cuponData.activo);

  const handleActivar = () => {
    setActivar(!activar);
  };

  return (
    <>
      <Form
        method={cuponData ? "patch" : "post"}
        className="w-11/12 md:min-w-[450px]  flex-col flex gap-5 text-gray-800"
        id="dream-form"
      >
        <div className="form-row flex flex-col gap-2 text-xl">
          <div className="Nombre flex flex-col items-start  gap-3">
            <label className=" text-gray-100" htmlFor="nombre">
              Nombre
            </label>
            <input
              className="h-10 p-4 w-full"
              type="text"
              id="nombre"
              name="nombre"
              required
              maxLength={30}
              defaultValue={defaultValues.nombre}
            />
          </div>

          <div className="oferta promocion">
            <label className=" text-gray-100" htmlFor="oferta">
              {" "}
              Promoción{" "}
            </label>

            <select
              // className=" p-4 w-full "
              className=" block appearance-auto w-full rounded-sm  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600  p-4  focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 hover:border-gray-200 leading-tight"
              id="oferta"
              name="oferta"
              required
              onChange={handleChangePromocion}
              value={changeValuePromocion}
              defaultValue={defaultValues.oferta}
            >
              <option value=""> Tipo de promoción </option>
              {/* <option value="Porcentaje"> Descuento %</option> */}
              <option value="dinero">Descuento $ </option>
              <option value="unoporuno"> # x #</option>
              <option value="bogo"> BOGO</option>

              {promociones.map((promocion) => (
                <option key={promocion.id} value={promocion.nombre}>
                  {" "}
                  {promocion.nombre}
                </option>
              ))}
            </select>

            {changeValuePromocion && (
              <div className=" bg-gray-600 p-3 flex justify-center">
                {/* PORCENTAJE */}
                {changeValuePromocion === "Porcentaje" && (
                  <div className="flex  items-center">
                    <div className="text-gray-300">Porcentaje a otorgar </div>
                    <input
                      className="h-10 text-center ml-5 mr-1 p-4 w-[130px] my-1"
                      type="number"
                      max="100"
                      id="formulaData"
                      name="formulaData"
                      defaultValue={defaultValues.formulaData}
                    />
                    <div className="text-gray-300 text-xl">% </div>
                  </div>
                )}
                {/* DINERO */}
                {changeValuePromocion === "dinero" && (
                  <div className="flex  items-center">
                    <div className="text-gray-300">Cantidad de Descuento </div>
                    <div className="text-gray-300 text-xl  ml-5 mr-1">$ </div>
                    <input
                      className="h-10 text-center p-4 w-[130px] my-1"
                      type="number"
                      id="formulaData"
                      name="formulaData"
                      defaultValue={defaultValues.formulaData}
                    />
                  </div>
                )}
                {/* NUMEROPORNUMERO */}
                {changeValuePromocion === "unoporuno" && (
                  <div className="flex  items-center  ">
                    <div className="text-gray-300 mr-5">
                      {" "}
                      ¿Cuanto por cuanto?{" "}
                    </div>
                    <div
                      className="flex items-center"
                      onChange={handleFormulaData}
                    >
                      <input
                        name="dataUno"
                        className="h-10 p-4 w-1/3 my-1"
                        type="number"
                        defaultValue={dataUno}
                      />
                      <div className="text-gray-300 text-xl  ml-5 mr-5">
                        {" "}
                        X{" "}
                      </div>
                      <input
                        name="dataDos"
                        className="h-10 p-4 w-1/3 my-1"
                        type="number"
                        defaultValue={dataDos}
                      />
                    </div>

                    <input
                      type="text"
                      id="formulaData"
                      name="formulaData"
                      hidden
                      value={getFormulaData}
                    />
                  </div>
                )}

                {/* BOGO */}
                {changeValuePromocion === "bogo" && (
                  <>
                    <div
                      onChange={handleFormulaData}
                      className="flex flex-col gap-5 w-full "
                    >
                      <div>
                        <div className="text-gray-300">Buy One </div>
                        <input
                          name="dataUno"
                          className="h-10 p-4 w-full my-1"
                          type="text"
                          defaultValue={dataUno}
                        />
                      </div>
                      <div>
                        <div className="text-gray-300 mb-0">Get One </div>
                        <input
                          name="dataDos"
                          className="h-10 p-4 w-full my-1 mt-0"
                          type="text"
                          defaultValue={dataDos}
                        />
                        <input
                          type="text"
                          id="formulaData"
                          name="formulaData"
                          hidden
                          value={getFormulaData}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* <input className="h-10 p-4 w-full" type="text" name="promocion" /> */}
          </div>

          <div className="Categoria ">
            <label className=" text-gray-100" htmlFor="categoria">
              {" "}
              Categoría{" "}
            </label>
            <select
              className=" p-4 w-full "
              id="categoria"
              name="categoria"
              required
              onChange={handleChange}
              value={changeValue}
              defaultValue={defaultValues.categoria}
            >
              <option value=""> Categoría </option>
              {/* <option value="Estética"> Estética </option>
            <option value="Guardería">Guardería </option>
            <option value="Hotel"> Hotel</option>
            <option value="Amigos"> Amigos</option>
            <option value="Actividades"> Actividades </option> */}
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {" "}
                  {categoria.nombre}
                </option>
              ))}
              {/* <option value="Propuesta"> Propuesta </option> */}
            </select>
            {/* <input className="h-10 p-4 w-full" type="text" name="categoria" /> */}
          </div>

          <div className="etiqueta ">
            <label className=" text-gray-100" htmlFor="servicio">
              {" "}
              Servicio{" "}
            </label>
            <input
              id="servicio"
              className="h-10 p-4 w-full"
              type="text"
              name="servicio"
              defaultValue={defaultValues.servicio}
            />
          </div>

          <div className="descripcion flex flex-col items-start  gap-3">
            <label className="mt-5 text-gray-100" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              type="text"
              id="descripcion"
              name="descripcion"
              className="p-2 h-[30vh] w-full"
              required
              defaultValue={defaultValues.descripcion}
            />
          </div>

          <div className="caduca flex flex-row my-5 gap-5">
            <div className="flex w-6/12 flex-col">
              <label className="text-gray-300" htmlFor="inicio">
                {" "}
                Inicio
              </label>
              <input
                className="w-full p-3"
                id="inicio"
                name="inicio"
                type="date"
                required
                defaultValue={
                  new Date(defaultValues.inicio).toISOString().split("T")[0]
                }
              />
            </div>
            <div className="flex w-6/12 flex-col">
              <label className="text-gray-300" htmlFor="termina">
                {" "}
                Termina
              </label>
              <input
                className="p-3 w-full"
                id="termina"
                name="termina"
                type="date"
                required
                defaultValue={
                  new Date(defaultValues.termino).toISOString().split("T")[0]
                }
              />
            </div>
          </div>
          <div className="flex  items-center  ">
            <label htmlFor="visitsRequired" className="text-gray-300 mr-5">
              {" "}
              Visitas Requeridas{" "}
            </label>
            <input
              id="visitsRequired"
              name="visitsRequired"
              className="h-10 p-4 w-1/3 my-1"
              min="1"
              max="4"
              type="number"
              defaultValue={defaultValues.visitsRequired}
              required
            />
            {/* <span className="validity"></span> */}
          </div>
          <div className="Activar flex align-middle gap-5 ">
            <label className=" text-gray-100" htmlFor="activo">
              {" "}
              Activar{" "}
            </label>
            <input
              className=" tw-5 h-5 "
              id="activo"
              name="activo"
              type="checkbox"
              checked={activar}
              onChange={handleActivar}
              defaultValue={defaultValues.activo}
            />
          </div>
        </div>
        {validationErrors && (
          <div>
            {Object.values(validationErrors).map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="flex-wrap text-gray-200 mt-16  mb-2 form-actions flex flex-row gap-5 justify-end ">
          <Link to="/cuponsList" className="bg-gray-800 w-min p-5 rounded-lg">
            {" "}
            Regresar{" "}
          </Link>

          <button
            className="border-gray-300 rounded-lg border bg-darkest p-5 py-3 "
            onClick={() => handleShare(true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </Form>
      <Form method="delete">
        <button
          className="border-gray-300 rounded-lg border bg-gray-950 p-5 py-5 "
          to=".."
        >
          Borrar
        </button>
      </Form>
    </>
  );
}

export default CuponForm;
