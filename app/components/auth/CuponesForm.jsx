import { Form, useNavigation } from '@remix-run/react'
import { useState } from 'react'

const CuponesForm = ({ categorias, promociones }) => {
  const navigation = useNavigation()

  const isSubmitting = navigation.state !== 'idle'

  const [changeValuePromocion, setChangeValuePromocion] = useState('')
  const [changeValue, setChangeValue] = useState('')
  const [activar, setActivar] = useState(false)

  const handleChangePromocion = event => {
    let index = event.target.selectedIndex
    setChangeValuePromocion(event.target.options[index].value)
  }

  const handleChange = event => {
    let index = event.target.selectedIndex
    setChangeValue(event.target.options[index].value)
  }

  const handleActivar = () => {
    setActivar(!activar)
  }

  return (
    <>
      <Form
        method="post"
        className="w-11/12 md:w-2/5  flex-col flex gap-5 text-gray-800"
      >
        <div className="Nombre ">
          <label className=" text-gray-100" htmlFor="nombre">
            {' '}
            Nombre{' '}
          </label>
          <input
            className="h-10 p-4 w-full"
            type="text"
            name="nombre"
            required
          />
        </div>
        <div className="Promocion ">
          <label className=" text-gray-100" htmlFor="promocion">
            {' '}
            Promoción{' '}
          </label>

          <select
            // className=" p-4 w-full "
            className=" block appearance-auto w-full rounded-sm  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600  p-4  focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 hover:border-gray-200 leading-tight"
            id="oferta"
            name="oferta"
            required
            onChange={handleChangePromocion}
            value={changeValuePromocion}
            // defaultValue={defaultValues.categoria}
          >
            <option value=""> Tipo de promoción </option>
            {/* <option value="Porcentaje"> Descuento %</option> */}
            <option value="dinero">Descuento $ </option>
            <option value="unoporuno"> # x #</option>
            <option value="bogo"> BOGO</option>

            {promociones.map(promocion => (
              <option key={promocion.id} value={promocion.nombre}>
                {' '}
                {promocion.nombre}
              </option>
            ))}

            {/* <option value="Agradecimiento"> Puntos por compra </option> */}
            {/* <option value="Propuesta"> Propuesta </option> */}
          </select>

          {changeValuePromocion && (
            <div className=" bg-gray-600 p-3 flex justify-center">
              {changeValuePromocion === 'Porcentaje' && (
                <div className="flex  items-center">
                  <div className="text-gray-300">Porcentaje a otorgar </div>
                  <input
                    className="h-10 text-center ml-5 mr-1 p-4 w-[130px] my-1"
                    type="number"
                    max="100"
                  />
                  <div className="text-gray-300 text-xl">% </div>
                </div>
              )}
              {changeValuePromocion === 'dinero' && (
                <div className="flex  items-center">
                  <div className="text-gray-300">Cantidad de Descuento </div>
                  <div className="text-gray-300 text-xl  ml-5 mr-1">$ </div>
                  <input
                    className="h-10 text-center p-4 w-[130px] my-1"
                    type="number"
                  />
                </div>
              )}
              {changeValuePromocion === 'unoporuno' && (
                <div className="flex  items-center  ">
                  <div className="text-gray-300 mr-5"> Cuanto por cuanto </div>
                  <input className="h-10 p-4 w-1/3 my-1" type="text" />
                  <div className="text-gray-300 text-xl  ml-5 mr-5"> X </div>

                  <input className="h-10 p-4 w-1/3 my-1" type="text" />
                </div>
              )}
              {changeValuePromocion === 'bogo' && (
                <>
                  <div className="flex flex-col gap-5 w-full ">
                    <div>
                      <div className="text-gray-300">Buy One </div>
                      <input className="h-10 p-4 w-full my-1" type="text" />
                    </div>
                    <div>
                      <div className="text-gray-300 mb-0">Get One </div>
                      <input
                        className="h-10 p-4 w-full my-1 mt-0"
                        type="text"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* <input className="h-10 p-4 w-full" type="text" name="promocion" /> */}
        </div>
        <div className="Categoria ">
          <label className=" text-gray-100" htmlFor="categoria">
            {' '}
            Categoría{' '}
          </label>
          <select
            className=" p-4 w-full "
            id="categoria"
            name="categoria"
            required
            onChange={handleChange}
            value={changeValue}
            // defaultValue={defaultValues.categoria}
          >
            <option value=""> Categoría </option>
            {/* <option value="Estética"> Estética </option>
            <option value="Guardería">Guardería </option>
            <option value="Hotel"> Hotel</option>
            <option value="Amigos"> Amigos</option>
            <option value="Actividades"> Actividades </option> */}
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.nombre}>
                {' '}
                {categoria.nombre}
              </option>
            ))}
            {/* <option value="Propuesta"> Propuesta </option> */}
          </select>
          {/* <input className="h-10 p-4 w-full" type="text" name="categoria" /> */}
        </div>
        <div className="etiqueta ">
          <label className=" text-gray-100" htmlFor="servicio">
            {' '}
            Servicio{' '}
          </label>
          <input
            id="servicio"
            className="h-10 p-4 w-full"
            type="text"
            name="servicio"
          />
        </div>

        <div className="descripcion flex-col flex align-middle gap-5 ">
          <label className=" text-gray-100" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="px-3 py-2 min-h-40 h-44"
            required
          />
        </div>

        <div className="flex  items-center  ">
          <label htmlFor="visitsRequired" className="text-gray-300 mr-5">
            {' '}
            Visitas{' '}
          </label>
          <input
            id="visitsRequired"
            name="visitsRequired"
            className="h-10 p-4 w-1/3 my-1"
            min="0"
            max="4"
            type="number"
            required
          />
          {/* <span className="validity"></span> */}
        </div>

        <div className="Activar flex align-middle gap-5 ">
          <label className=" text-gray-100" htmlFor="activo">
            {' '}
            Activar{' '}
          </label>
          <input
            className="w-5 h-5"
            name="activo"
            id="activo"
            type="checkbox"
            checked={activar}
            onChange={handleActivar}
          />

          {/* <input className="h-10 p-4 w-full" type="text" name="activar" /> */}
        </div>

        <button
          className=" rounded-lg self-center flex justify-center items-center text-2xl text-gray-100 text-center py-4 px-6 border-spacing-1 border-gray-500 border-2 mt-10 mb-20"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'En ello...' : 'Crear Cupón'}
        </button>
      </Form>
    </>
  )
}

export default CuponesForm
