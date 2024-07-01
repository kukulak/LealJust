import { Form, Link } from "@remix-run/react";
import { useRef, useState } from "react";
import useScrollBlock from "../util/useScrollBlock";

const BurgerMenu = ({ userId, userName, role }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const dialog = useRef();

  // console.log(userId)

  const [isOpen, setIsOpen] = useState(false);

  const manageOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      console.log("cierra");
      dialog.current.close();
      console.log("ALLOW SCROLL");
      allowScroll();
    } else {
      console.log("NO SCROLL");

      blockScroll();
    }
  };

  return (
    <div className="z-50 fixed w-full ">
      {isOpen ? (
        <button
          className=" text-gray-800 w-full bg-opacity-95  bg-gray-950 h-screen flex flex-col gap-1 justify-start content-start flex-wrap text-left "
          onClick={manageOpen}
        >
          <dialog
            ref={dialog}
            onClick={(event) => event.stopPropagation()}
            open
            className="   m-0 text-gray-800 p-5  bg-gray-300 h-screen flex flex-col gap-1 justify-starts content-start flex-wrap text-left "
          >
            <button
              onClick={manageOpen}
              className=" flex gap-[0.2rem] flex-col"
            >
              <div className="bg-gray-800 rounded-full h-[3px] w-6 rotate-45"></div>
              <div className="bg-gray-800 rounded-full h-[3px] w-6 -rotate-45 -mt-[6px]"></div>
            </button>

            <div className="flex flex-row flex-wrap gap-3 items-center my-5">
              {/* <img
                src=" "
                alt=""
                className=" rounded-full w-7 h-7 bg-gray-800"
              /> */}

              <div className=" pl-1 flex object-center items-center justify-center rounded-full w-7 h-7 bg-gray-800">
                <h3 className=" text-md  text-gray-200 ">
                  {" "}
                  {userName.substring(0, 1).toUpperCase()}.
                </h3>
              </div>
              <Link onClick={manageOpen} to={`/humanProfile/${userId}`}>
                Ver Perfil
              </Link>
            </div>

            {role === "ADMIN" && (
              <Link onClick={manageOpen} to="/homeAdmin">
                ADMIN HOME
              </Link>
            )}

            <div className="flex flex-row flex-wrap gap-3 items-center mt-5 ">
              <Link onClick={manageOpen} to={`/explorar`}>
                Explorar
              </Link>
            </div>

            {role === "ADMIN" && (
              <div className="flex flex-row flex-wrap gap-3 items-center my-1">
                <Link onClick={manageOpen} to={`/buscarCliente`}>
                  Buscar
                </Link>
              </div>
            )}

            <div className="flex flex-col my-5 mt-[25vh] md:mt-[50vh]">
              <Link onClick={manageOpen} to="/aviso_de_privacidad">
                Aviso de Privacidad
              </Link>
              <Link onClick={manageOpen} to="/terminos_y_condiciones">
                Condiciones de Uso
              </Link>
            </div>

            <div className=" mt-5 ">
              <Form
                onSubmit={manageOpen}
                method="post"
                action="/logout"
                id="logout-form"
              >
                <button type="submit">Cerrar Sesión</button>
              </Form>
            </div>
          </dialog>
        </button>
      ) : (
        <div className="z-40 p-5 h-1 ">
          <button onClick={manageOpen} className=" flex gap-1 flex-col">
            <div className="bg-gray-300 rounded-full h-[2px] w-4"></div>
            <div className="bg-gray-300 rounded-full h-[2px] w-3"></div>
            <div className="bg-gray-300 rounded-full h-[2px] w-4"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
