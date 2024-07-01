import { NavLink } from "@remix-run/react";

import home from "/img/homeO.svg";
import lupa from "/img/lupa.svg";
import perros from "/img/perros.svg";
import engrane from "/img/engrane.svg";
import humano from "/img/humano.svg";

const MenuMobile = ({ userId, role }) => {
  return (
    <section className=" justify-center pointer-events-none z-40 mobile items-end fixed max-w-[700px] w-full h-full flex">
      {/* {role === "ADMIN" ||
        (role === "USER" && ( */}
      <menu className=" w-11/12 rounded-xl rounded-br-none rounded-bl-none md:rounded-br-xl md:rounded-bl-xl  md:mb-7 mb-0 justify-evenly pt-3 max-w-full  gap-3  h-14 bg-[#2b323f] flex">
        <>
          <NavLink
            className=" hover:scale-125 text-xs pointer-events-auto"
            to={`/`}
          >
            {" "}
            <img className="w-8" src={home} alt="go" />
          </NavLink>

          <NavLink
            className=" hover:scale-125 text-xs pointer-events-auto"
            to={`/humanProfile/${userId}`}
          >
            {" "}
            <img className="w-10 -mt-0.5" src={humano} alt="go" />
            {/* {text}{' '} */}
          </NavLink>

          {role === "ADMIN" && (
            <NavLink
              className=" hover:scale-125 text-xs pointer-events-auto"
              to={"/buscarCliente"}
            >
              {" "}
              <img className="w-7 mt-1" src={lupa} alt="go" />
              {/* {text}{' '} */}
            </NavLink>
          )}

          <NavLink
            className=" hover:scale-125 text-xs pointer-events-auto"
            to={"/explorar"}
          >
            {" "}
            <img className="w-8 mb-1 " src={perros} alt="go" />
            {/* {text}{' '} */}
          </NavLink>
        </>
      </menu>
      {/* ))} */}
    </section>
  );
};

export default MenuMobile;
