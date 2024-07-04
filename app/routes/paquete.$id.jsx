import { redirect, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { prisma } from "../data/database.server";
import { getPeludo } from "../data/peludo.server";

const PaqueteModal = ({ paquete, fetcher }) => {
  const { peludoId, peludo } = useLoaderData();

  const [dias, setDias] = useState(paquete ? paquete.dias - paquete.usados : 0);
  const [tipo, setTipo] = useState(paquete ? paquete.tipo : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("peludoId", peludoId);
    if (paquete) {
      formData.append("paqueteId", paquete.id);
      formData.append("diasUsados", dias);
    } else {
      formData.append("tipo", tipo);
      formData.append("dias", dias);
    }

    fetcher.submit(formData, { method: "post", action: "/updatePaquete" });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {!paquete && (
          <div className="flex flex-col flex-wrap my-10">
            <label htmlFor="tipo">Tipo de Paquete:</label>
            <input
              className="text-gray-900 p-2 text-lg"
              name="tipo"
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col flex-wrap my-10">
          <label>{paquete ? "Días a usar:" : "Días del Paquete:"}</label>
          <input
            className="text-gray-900 p-2 text-lg"
            type="number"
            value={dias}
            onChange={(e) => setDias(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="bg-gray-800 p-5 rounded-md">
          {paquete ? "Usar Días" : "Añadir Paquete"}
        </button>
      </form>
      {/* <button onClick={onClose}>Cerrar</button> */}
    </div>
  );
};

export default PaqueteModal;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const peludoId = Number(formData.get("peludoId"));
  const paqueteId = formData.get("paqueteId");
  const tipo = formData.get("tipo");
  const dias = Number(formData.get("dias"));
  const diasUsados = Number(formData.get("diasUsados"));

  try {
    if (paqueteId) {
      // Actualizar días usados de un paquete existente
      await prisma.paquete.update({
        where: { id: Number(paqueteId) },
        data: { usados: { increment: diasUsados } },
      });
    } else {
      // Crear un nuevo paquete
      await prisma.paquete.create({
        data: {
          peludoId,
          tipo,
          dias,
          usados: 0,
        },
      });
    }
    return redirect(`/peludo/${peludoId}`);
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to update paquete");
  }
};

export async function loader({ params, request }) {
  const peludoId = params.id;
  const peludo = await getPeludo(peludoId);

  return {
    peludo,
    peludoId,
  };
}
