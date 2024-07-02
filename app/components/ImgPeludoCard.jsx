import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

const ImgPeludoCard = ({ foto, role }) => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const imageRef = useRef();

  // let fotos = gsap.utils.toArray(".imageRotate");
  useGSAP(
    () => {
      gsap.to(imageRef.current, {
        scale: 1.151,
        // rotation: 10,
        y: 0,
        ease: "expo.out",
        // duration: 3,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "clamp(center center)",
          end: "clamp(200px  50%)",
          // markers: true,
          toggleActions: "restart pause reverse pause",
          scrub: true,
        },
      });
    },
    { scope: imageRef },
  );

  return (
    <>
      {role === "ADMIN" ? (
        <img
          ref={imageRef}
          alt="Foto de tu perrito"
          src={foto}
          // src="/img/IMG_0238.png"
          className=" object-cover rounded-full  flex w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-gray-500 overflow-hidden self-center -mt-12 scroll-mx-32 z-10 shadow-black/50 shadow-2xl shadow-[0 0 100px 20px #030712] border-gray-800 border-[0.5px] "
        />
      ) : (
        <img
          ref={imageRef}
          alt="Foto de tu perrito"
          src={foto}
          // src="/img/IMG_0238.png"
          className=" object-none  rounded-full  flex w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-gray-500 overflow-hidden self-center -mt-12 scroll-mx-32 z-10 shadow-black/50 shadow-2xl "
        />
      )}
    </>
  );
};

export default ImgPeludoCard;
