import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Carrusel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const timeoutRef = useRef(null);
  const startX = useRef(0);
  const endX = useRef(0);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };

    timeoutRef.current = setTimeout(nextSlide, 5000); // Change the image every 3 seconds

    return function () {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, length]);

  useEffect(() => {
    if (document.querySelector(".carousel-slide.active")) {
      gsap.fromTo(
        ".carousel-slide.active ",
        { opacity: 0.3, scale: 1.1 },
        { opacity: 1, duration: 1.3, scale: 1 },
      );
    }
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleTouchStart = (e) => {
    console.log("Touch Start:", e.touches[0].clientX);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    console.log("Touch Move:", e.touches[0].clientX);
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    console.log("Touch End:", startX.current, endX.current);
    if (startX.current - endX.current > 100) {
      console.log("Swiped left");
      nextSlide();
    } else if (endX.current - startX.current > 100) {
      console.log("Swiped right");
      prevSlide();
    }
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div
      className="shadow-2xl shadow-black/50 carousel w-full mt-10 flex justify-center h-96 bg-gray-950"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* <button className="left-arrow " onClick={prevSlide}>
        ❮
      </button>
      <button className="right-arrow" onClick={nextSlide}>
        ❯
      </button> */}
      <div className="carousel-wrapper  w-full rounded-xl overflow-hidden">
        {images.map((image, index) => (
          <div
            className={
              index === current
                ? "carousel-slide active w-full"
                : "carousel-slide"
            }
            key={index}
          >
            {index === current && (
              <img
                src={image.url}
                alt="peludo"
                className="carousel-image object-cover max-h-96 z-10 shadow-2xl shadow-black/50 h-full w-full rounded-xl "
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
