import { useEffect, useRef } from "react";

// import { blockScroll, allowScroll } from useScrollBlock
import useScrollBlock from "../util/useScrollBlock";
import PropTypes from "prop-types";

function Modal({ children, onClose, estado }) {
  Modal.propTypes = {
    children: PropTypes.string.isRequired,
    onClose: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
  };
  const [blockScroll, allowScroll] = useScrollBlock();
  const dialog = useRef();

  useEffect(() => {
    if (estado) {
      // console.log('abierto')
      // dialog.current.close()
      blockScroll();
    } else {
      // console.log('cerrado')
      allowScroll();
    }
  }, [allowScroll, blockScroll, estado]);

  if (!estado) return null;

  return (
    <div
      className="top-0 right-0 fixed z-50 w-screen h-screen bg-opacity-95  modal-backdrop flex justify-items-center items-center bg-gray-800 pt-[8%] overflow-auto "
      onClick={onClose}
    >
      <dialog
        ref={dialog}
        className=" w-10/12 artmodal bg-grey flex flex-row flex-wrap gap-5 bg-transparent justify-items-start mt-0 pt-5 justify-center"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}

export default Modal;
