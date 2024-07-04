import { Form, Link, useNavigation } from "@remix-run/react";
import { useState } from "react";
import NumberTicker from "./magicui/number-ticker";

const DataPaquete = ({ user, paquete, editando, openPaquete }) => {
  // const [openPaquete, setOpenPaquete] = useState(true);
  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  const handleEditPaquetes = () => {
    console.log("handle");
    openPaquete({
      id: paquete.id,
      categoria: paquete.categoria,
      cantidad: paquete.cantidad,
      usados: paquete.usados,
    });
    editando(true);
  };

  return (
    <div>
      {openPaquete && (
        <button
          onClick={handleEditPaquetes}
          className="my-3 flex justify-center flex-col items-center"
          key={paquete.id}
          disabled={user !== "ADMIN"}
        >
          <p className="flex items-baseline justify-center">
            {/* Quedan{" "} */}
            <span className=" text-2xl text-gray-900 ">
              {" "}
              <NumberTicker value={paquete.cantidad - paquete.usados} />
            </span>{" "}
            <span className=" text-base">/ {paquete.cantidad}</span>{" "}
            {/* días. */}
          </p>
          <p className="text-xs">
            {" "}
            <span>{paquete.categoria} </span>
          </p>
        </button>
      )}
    </div>
  );
};

export default DataPaquete;
