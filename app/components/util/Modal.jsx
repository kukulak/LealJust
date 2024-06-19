function Modal({ children, onClose }) {
  return (
    <div
      className="top-0 right-0 fixed z-50 w-full h-screen bg-darkest bg-opacity-75 modal-backdrop flex justify-items-center items-center"
      // onClick={onClose}
    >
      <dialog
        className="modal bg-grey"
        open
        onClick={event => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  )
}

export default Modal
