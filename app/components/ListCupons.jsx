import { Link } from '@remix-run/react'

const ListCupons = ({ cupons }) => {
  // const categoryOrder = ['Categoria1', 'Categoria2', 'Categoria3', 'Categoria4']

  return (
    <div className="flex flex-col gap-5 justify-center mb-20 flex-wrap">
      {Object.keys(cupons).length > 0 &&
        Object.keys(cupons).map(categoria => (
          <div
            className="flex flex-col gap-5 justify-center mb-10 flex-wrap"
            key={categoria}
          >
            <h2>{categoria}</h2>
            <div className="flex gap-5 justify-center mb-10 flex-wrap">
              {cupons[categoria].map(cupon => (
                <Link
                  to={`/editCupon/${cupon.id}`}
                  className="flex  flex-col mb-10 bg-gray-800 hover:bg-gray-600 w-[150px] rounded-lg text-center p-5 justify-center items-center"
                  key={cupon.id}
                >
                  {cupon.nombre}
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default ListCupons
