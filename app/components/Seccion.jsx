import React from "react";
import Rewards from "./Rewards";
const Seccion = ({
  titulo,
  promociones,
  onClick,
  descripcion,
  cuponId,
  visitsRemaining,
  user,
}) => {
  let firstClickableFound = false;

  return (
    <div className=" bg-gray-500 rounded-2xl md:px-5 my-1 pt-10 pb-10 bg-opacity-10">
      {titulo && (
        <div className="flex gap-5 flex-col mb-20">
          <p className="ml-10 text-2xl">{titulo}</p>
          <div className=" flex flex-wrap justify-center gap-5 ">
            {user.role !== "ADMIN" &&
              promociones?.map((promo, index) => (
                <>
                  {visitsRemaining[index] >= 1 &&
                    [...Array(visitsRemaining[index] - 1)].map((visit, i) => (
                      <button
                        // disabled={i === 0 && index === 0 ? false : true}
                        disabled={false}
                        key={index + promo}
                        onClick={() =>
                          onClick(
                            promo,
                            descripcion[index],
                            cuponId[index],
                            visitsRemaining[index] - i,
                          )
                        }
                        className="flex flex-wrap justify-center gap-5 "
                      >
                        <Rewards
                          key={index + visit}
                          numero={visitsRemaining[index] - i - 1}
                          promocion={`para la siguiente promoción`}
                          style={
                            (i + 1 * 0.9) /
                            [...Array(visitsRemaining[index])].length
                          }
                        />
                      </button>
                    ))}
                  <button
                    // disabled={index === 0 ? false : true}
                    disabled={false}
                    key={index + promo}
                    onClick={() =>
                      onClick(promo, descripcion[index], cuponId[index])
                    }
                    className="flex flex-wrap justify-center gap-5 "
                  >
                    <Rewards promocion={promo} />
                  </button>
                </>
              ))}
            {user.role === "ADMIN" &&
              promociones?.map((promo, index) => (
                <React.Fragment key={`promo-${index}`}>
                  {visitsRemaining[index] >= 1 &&
                    [...Array(visitsRemaining[index] - 1)].map((visit, i) => {
                      const isFirstSubCoupon = i === 0;

                      return (
                        <button
                          // Habilitar solo el primer subcupon si se requieren múltiples visitas
                          disabled={!isFirstSubCoupon}
                          key={`visit-${index}-${i}`}
                          onClick={() =>
                            onClick(
                              promo,
                              descripcion[index],
                              cuponId[index],
                              visitsRemaining[index] - i,
                            )
                          }
                          className={`${
                            isFirstSubCoupon
                              ? " border-gray-500 border-opacity-30 border-2 p-1 animate-pulse  "
                              : ""
                          }   flex flex-wrap justify-center gap-5`}
                        >
                          <Rewards
                            key={`reward-${index}-${i}`}
                            numero={visitsRemaining[index] - i - 1}
                            promocion={`para la siguiente promoción`}
                            style={
                              (i + 1 * 0.9) /
                              [...Array(visitsRemaining[index])].length
                            }
                          />
                        </button>
                      );
                    })}
                  <button
                    // Habilitar cupones que no requieren más de 1 visita
                    disabled={visitsRemaining[index] > 1}
                    key={`promo-${index}`}
                    onClick={() =>
                      onClick(promo, descripcion[index], cuponId[index])
                    }
                    className="flex flex-wrap justify-center gap-5"
                  >
                    <Rewards promocion={promo} />
                  </button>
                </React.Fragment>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Seccion;
