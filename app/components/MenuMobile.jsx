import { NavLink } from "@remix-run/react";

import goHome from "/img/goHome.png";
import goSearch from "/img/goSearch.png";
import goProfile from "/img/goProfile.png";
import goSettings from "/img/goSettings.png";

const MenuMobile = ({ userId, role }) => {
  return (
    <section className=" justify-center pointer-events-none z-40 mobile items-end fixed max-w-[700px] w-full h-full flex">
      {/* {role === "ADMIN" ||
        (role === "USER" && ( */}
      <menu className=" w-11/12 rounded-xl rounded-br-none rounded-bl-none md:rounded-br-xl md:rounded-bl-xl  md:mb-7 mb-0 justify-evenly pt-3 max-w-full  gap-3  h-14 bg-[#2b323f] flex">
        <>
          <NavLink
            className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
            to={`/`}
          >
            {" "}
            <img className="w-6" src={goHome} alt="go" />
          </NavLink>

          <NavLink
            className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
            to={`/humanProfile/${userId}`}
          >
            {" "}
            <img className="w-6" src={goSettings} alt="go" />
            {/* {text}{' '} */}
          </NavLink>

          {role === "ADMIN" && (
            <NavLink
              className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
              to={"/buscarCliente"}
            >
              {" "}
              <img className="w-6" src={goSearch} alt="go" />
              {/* {text}{' '} */}
            </NavLink>
          )}

          <NavLink
            className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
            to={"/explorar"}
          >
            {" "}
            <img className="w-6" src={goProfile} alt="go" />
            {/* {text}{' '} */}
          </NavLink>
        </>
      </menu>
      {/* ))} */}
    </section>
  );
};

export default MenuMobile;
