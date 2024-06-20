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
      <menu className=" w-11/12 rounded-xl mb-7 justify-evenly pt-2 max-w-full  gap-3  h-10 bg-[#2b323f] flex">
        <>
          <NavLink
            className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
            to={`/`}
            key="item"
          >
            {" "}
            <img className="w-4" src={goHome} alt="go" />
          </NavLink>

          <NavLink
            className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
            to={`/humanProfile/${userId}`}
            key="item"
          >
            {" "}
            <img className="w-4" src={goSettings} alt="go" />
            {/* {text}{' '} */}
          </NavLink>

          {role === "ADMIN" && (
            <NavLink
              className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
              to={"/buscarCliente"}
              key="item"
            >
              {" "}
              <img className="w-4" src={goSearch} alt="go" />
              {/* {text}{' '} */}
            </NavLink>
          )}

          <NavLink
            className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
            to={"/explorar"}
            key="item"
          >
            {" "}
            <img className="w-4" src={goProfile} alt="go" />
            {/* {text}{' '} */}
          </NavLink>
        </>
      </menu>
      {/* ))} */}
    </section>
  );
};

export default MenuMobile;
