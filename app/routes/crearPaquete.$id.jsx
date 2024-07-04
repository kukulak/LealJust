import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { getUserFromSession, updatePuntos } from "../data/auth.server";
import { getPeludo } from "../data/peludo.server";
import { useState } from "react";
import { createPaquete } from "../data/paquete.server";
const CrearPaquete = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  const { peludo, user, paqueteData } = useLoaderData();
  const defaultValues = paqueteData
    ? {
        categoria: paqueteData.categoria,
        cantidad: paqueteData.cantidad,
      }
    : {
        categoria: "",
        cantidad: "",
      };

  const [changeValueCategoria, setChangeValueCategoria] = useState(
    defaultValues.oferta,
  );

  const handleChangeCategoria = (event) => {
    let index = event.target.selectedIndex;
    setChangeValueCategoria(event.target.options[index].value);
  };

  return (
    <div>
      <div className=" m-20  text-center text-lg">
        <p>Creando paquete para</p>
        <p className="text-2xl text-center">{peludo.nombre}</p>
      </div>
      <Form
        method="post"
        className="  w-10/12 flex flex-col gap-10 text-gray-900"
      >
        <div className=" w-full ">
          <p className="text-gray-300">Categoría</p>{" "}
          <select
            className="w-full h-11 px-4"
            id="categoria"
            name="categoria"
            required
            value={changeValueCategoria}
            onChange={handleChangeCategoria}
            defaultValue={defaultValues.categoria}
          >
            <option value="Guardería"> Guardería </option>
            <option value="Baño"> Baño </option>
            <option value="Corte"> Corte </option>
            <option value="Deslanado"> Deslanado </option>
            <option value="Hotel"> Hotel </option>
            <option value="Entrenamiento"> Entrenamiento </option>
          </select>
        </div>
        <div>
          <p className="text-gray-300">Cantidad</p>
          <input
            id="cantidad"
            name="cantidad"
            className=" p-4 w-1/3 my-1 text-2xl"
            min="1"
            max="100"
            type="number"
            defaultValue={defaultValues.cantidad}
            required
          />
        </div>

        <div className="flex-wrap text-gray-200 mt-16  mb-2 form-actions flex flex-row gap-5 justify-end ">
          <Link to="/cuponsList" className="bg-gray-800 w-min p-5 rounded-lg">
            {" "}
            Regresar{" "}
          </Link>

          <button
            className="border-gray-300 rounded-lg border bg-darkest p-5 py-3 "
            // onClick={() => handleShare(true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CrearPaquete;

export async function loader({ params, request }) {
  const peludoId = params.id;
  const user = await getUserFromSession(request);

  const peludo = await getPeludo(peludoId);
  // console.log(cuponesGuarderia, "CUPONESGUARDERIA");
  return {
    peludo,
    user,
  };
}

export async function action({ params, request }) {
  const formData = await request.formData();
  // const { userId } = getUserFromSession(request);
  const paqueteData = Object.fromEntries(formData);
  const perroId = params.id;

  if (perroId) {
    await createPaquete(paqueteData.categoria, paqueteData.cantidad, perroId);
    await updatePuntos(perroId, 20);
    // await registerVisit(peludoId, cuponId)

    return redirect(`/perro/${perroId}`);
  }
  return true;
}
