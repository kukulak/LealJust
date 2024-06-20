import { Link } from "@remix-run/react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import ImgPeludoCard from "./ImgPeludoCard";

const PeludoCard = ({
  id,
  nombre,
  raza,
  instagram,
  foto,
  adminButtons,
  role,
}) => {
  return (
    <div
      // ref={container}
      className="flex flex-col gap-2 first-letter:uppercase  min-w-36 bg-[#101622]   pb-5 px-3 mb-14 rounded-lg  justify-center text-center items-center"
    >
      {adminButtons ? (
        <Link to={`/perro/${id}`}>
          {/* <img
            ref={imageRef}
            alt="Foto de tu perrito"
            src={foto}
            // src="/img/IMG_0238.png"
            className=" imageRotate object-cover w-[120px] md:w-[130px]"
          /> */}
          <ImgPeludoCard role={role} foto={foto} />
        </Link>
      ) : (
        <>
          {/* <img
            ref={imageRef}
            className="imageRotate  rounded-full flex w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-gray-500 overflow-hidden self-center -mt-12  z-10 shadow-black/50 shadow-2xl mb-5 object-cover "
            alt="Foto de tu perrito"
            src={foto}
            // src="/img/IMG_0238.png"
          /> */}
          <a href={`https://www.instagram.com/${instagram}`}>
            <ImgPeludoCard foto={foto} />
          </a>
        </>
      )}
      <div className="text-lg ">{nombre}</div>
      <div className="text-xs font-thin   ">{raza}</div>
      {instagram && (
        <button className="text-sm">@{instagram.slice(0, 8)}... </button>
      )}
    </div>
  );
};

export default PeludoCard;

// #e5e7eb0d
