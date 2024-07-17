import { Link } from "@remix-run/react";

import PropTypes from "prop-types";

const ListCupons = ({ cupons }) => {
  // const categoryOrder = ['Categoria1', 'Categoria2', 'Categoria3', 'Categoria4']
  ListCupons.propTypes = {
    cupons: PropTypes.string.isRequired,
  };

  console.log(cupons);

  const HeightChart = ({ usedCupon, id, nombre }) => {
    const maxNumber = 1;
    let number = (usedCupon * 40) / maxNumber + "px";
    return (
      <>
        <Link
          to={`/editCupon/${id}`}
          style={{ height: number }}
          className="flex  flex-col  bg-gray-700 hover:bg-gray-600 w-[50px] rounded-lg text-center p-1 justify-end items-center"
        >
          <p>{usedCupon}</p>
        </Link>
        {/* <p className="flex my-2  flex-col mb-10  w-[150px] text-center justify-center items-center">
          {nombre}
        </p> */}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-5 justify-center mb-20 flex-wrap">
      <div className="flex gap-5 justify-center  items-end flex-wrap mb-5">
        {Object.keys(cupons).length > 0 &&
          Object.keys(cupons).map((categoria) => (
            <div
              className="flex gap-5 justify-center flex-wrap"
              key={categoria}
            >
              <div className="flex gap-5 justify-center mb-2 flex-wrap">
                {cupons[categoria].map((cupon) => (
                  <div key={cupon.id} className="flex-col flex items-center ">
                    {/* <Link
                      to={`/editCupon/${cupon.id}`}
                      className="flex  flex-col  bg-gray-800 hover:bg-gray-600 w-[150px] rounded-lg text-center p-5 justify-center items-center"
                    >
                      <p>{cupon._count.used}</p>
                    </Link> */}
                    <HeightChart
                      usedCupon={cupon._count.used}
                      id={cupon.id}
                      nombre={cupon.nombre}
                    />
                    <p className="flex my-2 text-xs flex-col mb-10 text-center justify-center ">
                      {cupon.nombre.slice(0, 12)}{" "}
                      {cupon.nombre.length > 12 && "..."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {Object.keys(cupons).length > 0 &&
        Object.keys(cupons).map((categoria) => (
          <div
            className="flex flex-col gap-5 justify-center mb-10 flex-wrap"
            key={categoria}
          >
            <h2>{categoria}</h2>
            <div className="flex gap-5 justify-center mb-10 flex-wrap">
              {cupons[categoria].map((cupon) => (
                <Link
                  to={`/editCupon/${cupon.id}`}
                  className="flex  flex-col mb-10 bg-gray-800 hover:bg-gray-600 w-[150px] rounded-lg text-center p-5 justify-center items-center"
                  key={cupon.id}
                >
                  <p>{cupon.nombre}</p>
                  <p>{cupon._count.used}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListCupons;
