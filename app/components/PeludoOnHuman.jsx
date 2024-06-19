import { Link } from '@remix-run/react'

const PeludoOnHuman = ({ nombre, peludoId, foto, onClick }) => {
  return (
    <div className="pt-6 flex flex-col mt-24 bg-[#37415142]  p-5 rounded-lg">
      {' '}
      <div className="rounded-full place-self-center flex w-[130px] bottom h-[130px] bg-gray-700 overflow-hidden -mt-16 mb-10 z-10 justify-center items-stretch">
        <img
          alt="Foto de tu perrito"
          src={foto}
          className="object-cover w-[130px]  "
        />
      </div>
      <Link
        to={`/profile/${peludoId}`}
        className=" bg-gray-800 text-gray-300 mt-0 py-3 px-5  place-self-center justify-center flex rounded-lg"
        onClick={onClick}
      >
        Ir al Perfil de{' '}
        <span className=" first-letter:uppercase font-bold">
          {' '}
          &nbsp; {nombre}{' '}
        </span>
      </Link>
      <Link
        to={`/editPeludo/${peludoId}`}
        className=" bg-yellow-400 mt-6 w-28 p-2 justify-center flex place-self-center rounded-lg"
        onClick={onClick}
      >
        Editar
      </Link>
    </div>
  )
}

export default PeludoOnHuman
