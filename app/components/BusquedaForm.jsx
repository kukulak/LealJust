import { Form, useNavigation } from '@remix-run/react'
import { useState } from 'react'

const BusquedaForm = () => {
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
    <Form
      method="post"
      className="w-11/12 m-20 flex-col flex gap-5 text-gray-800"
    >
      <select
        className=" p-4 w-full "
        id="especie"
        name="especie"
        required
        onChange={handleChangePromocion}
        value={changeValuePromocion}
        // defaultValue={defaultValues.categoria}
      >
        <option value=""> Buscar por </option>

        <option value="peludo">Peludo </option>
        <option value="humano">Humano</option>
      </select>

      {changeValuePromocion && (
        <>
          <div className="Nombre ">
            <label className=" text-gray-100" htmlFor="nombre">
              {' '}
              Nombre del {changeValuePromocion}
            </label>
            <input
              className="h-10 p-4 w-full"
              type="text"
              id="nombre"
              name="nombre"
            />
          </div>
          <button className=" bg-gray-800 h-[130px] w-[130px] rounded-full self-center flex justify-center items-center text-2xl text-gray-100 text-center  p-4 border-spacing-1 border-gray-600 border-2 mt-10 mb-5">
            {isSubmitting ? (
              <div className="text-sm">Buscando...</div>
            ) : (
              'Buscar'
            )}
          </button>
        </>
      )}
    </Form>
  )
}

export default BusquedaForm
