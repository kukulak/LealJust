import { Link } from "@remix-run/react";

import more from "/img/nasHumano.svg";
import lupa from "/img/lupa.svg";
import goCupones from "/img/goCupones.png";
import goCuponesView from "/img/goCuponesView.png";
import loJLH from "/img/lo-JLH-hrz-big.png";

const Intro = ({ user }) => {
  return (
    <div className=" -mt-28 flex items-center content-center justify-center md:justify-start md:pt-[20vh] flex-col h-full">
      <h1 className=" font-montserrat  text-3xl ">Programa</h1>
      <h1 className=" font-montserrat  text-5xl ">de Lealtad</h1>
      <img
        className="mt-3 w-11/12 max-w-[350px]"
        src={loJLH}
        alt="logo Just Like Home"
      />
      {/* <p className=" text-4xl font-black m-4">Just Like Home</p> */}
      {/* <div className="flex flex-row gap-2 items-end mb-2 mt-10">
        <p className=""> Hola</p>
        <p className="first-letter:uppercase text-5xl ">{user}</p>
      </div> */}
      <div className="flex justify-evenly flex-wrap w-full mt-10">
        <Link
          className="rounded-br-[2rem]  bg-slate-800 rounded-2xl w-36 h-36 flex-col  flex justify-center items-center  "
          to={"/auth?mode=signup"}
        >
          <img className="w-10 mb-3" src={more} alt="more" />
          <p className="text-center">Nuevo Cliente</p>
        </Link>

        <Link
          style={{ gridColumnStart: 2, gridRowStart: 2 }}
          className=" bg-slate-800 rounded-2xl rounded-tl-[2rem]  w-36 h-36 flex-col  flex justify-center items-center  "
          to="/buscarCliente"
        >
          <img className="w-10 mb-3" src={lupa} alt="more" />

          <p className="text-center">Buscar Cliente</p>
        </Link>
      </div>

      <div className="flex  items-center justify-center flex-col flex-wrap w-full">
        <Link
          className="mt-14 flex hover:text-gray-600 rounded-xl w-34 h-14  text-gray-200"
          to="/creador"
        >
          {" "}
          <img className="w-5 h-5 m-3 mt-[3px]  " src={goCupones} alt="more" />
          Crear Ofertas y Promociones
        </Link>

        <Link
          className="mt-0  flex rounded-xl hover:text-gray-600 w-30 h-14 text-gray-200"
          to="/cuponsList"
        >
          {" "}
          <img
            className="w-5 h-5 m-3 mt-[3px] "
            src={goCuponesView}
            alt="more"
          />
          Ver y editar tus cupones
        </Link>
      </div>
    </div>
  );
};

export default Intro;
