import { getAllPeludos } from "../data/peludo.server";
import { Link, useLoaderData } from "@remix-run/react";
import PeludoCard from "../components/PeludoCard";

import { requireUserSession } from "../data/auth.server";
import { useEffect, useState } from "react";

const Explorar = () => {
  const { user, allPeludos } = useLoaderData();
  const [adminButtons, setAdminButtons] = useState(true);

  useEffect(() => {
    if (user.role !== "ADMIN") {
      setAdminButtons(false);
    }
  }, [user]);

  return (
    <>
      <div className="w-10/12 md:w-8/12 ">
        <p className="mt-24   text-left text-3xl font-extralight ">
          Conoce a los compañeros de tu peludo, ¡hay que seguirnos entre todos!
        </p>
        <p>
          Solo los peludos que compartieron sus perfiles de Instagram
          abiertamente están en esta lista.
        </p>
        <Link className=" underline" to="/aviso_de_privacidad">
          {" "}
          Mira el aviso de privacidad{" "}
        </Link>
      </div>
      <div className="mt-28  pb-24 flex flex-col justify-center items-center content-center w-full">
        <section className="pt-5 w-10/12 flex gap-y-16 gap-x-3 gap flex-wrap  justify-center max-w-[750px] ">
          {allPeludos &&
            allPeludos.map(
              (peludo) =>
                peludo.instagram && (
                  <PeludoCard
                    id={peludo.id}
                    nombre={peludo.nombre}
                    raza={peludo.raza}
                    foto={
                      peludo.fotos.length >= 1
                        ? peludo.fotos[0].url
                        : peludo.foto
                    }
                    instagram={peludo.instagram}
                    key={peludo.id}
                    adminButtons={adminButtons}
                    role={user.role}
                  />
                ),
            )}
        </section>

        {/* <section className="pt-5 w-10/12 flex gap-y-16 gap-x-3 gap flex-wrap  justify-center max-w-[750px] ">
          {allPeludos &&
            allPeludos.map(
              peludo =>
                peludo.instagram && (
                  <PeludoCard
                    id={peludo.id}
                    nombre={peludo.nombre}
                    raza={peludo.raza}
                    foto={peludo.foto}
                    instagram={peludo.instagram}
                    key={peludo.id}
                    adminButtons={adminButtons}
                    role={user.role}
                  />
                )
            )}
        </section> */}
      </div>
    </>
  );
};

export default Explorar;

export async function loader({ request }) {
  const allPeludos = await getAllPeludos();
  // const user = await getUserFromSession(request)
  const user = await requireUserSession(request);

  return { allPeludos, user };
}
