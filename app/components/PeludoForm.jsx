import { Form, useNavigation } from '@remix-run/react'
const PeludoForm = ({ imageUrl, usuarioId }) => {
  const navigation = useNavigation()

  const isSubmitting = navigation.state !== 'idle'

  return (
    <div className="mt-10 w-full items-center flex flex-col gap-5">
      <Form
        method="post"
        className=" rounded-xl  w-10/12 flex flex-col gap-3 text-gray-900"
      >
        {/* //peludo */}
        <input type="hidden" name="imageUrl" id="imageUrl" value={imageUrl} />

        <input
          type="hidden"
          name="usuarioId"
          id="usuarioId"
          value={usuarioId}
        />

        <div className=" w-12/12 flex flex-col gap-3 text-gray-900 bg-gray-800 px-3 py-6">
          <label className=" text-gray-100" htmlFor="nombre">
            Nombre del peludo
          </label>
          <input
            className="h-10 p-4"
            type="text"
            name="nombre"
            id="nombre"
            required
          />
          <label className=" text-gray-100" htmlFor="raza">
            Raza
          </label>
          <input
            required
            className="h-10 p-4"
            type="text"
            name="raza"
            id="raza"
          />

          <label className=" text-gray-100" htmlFor="nacimiento">
            Fecha de nacimiento
          </label>
          <input
            className="h-10 p-4"
            type="date"
            name="nacimiento"
            id="nacimiento"
            required
          />

          <label className=" text-gray-100" htmlFor="instagram">
            Instagram
          </label>
          <input
            required
            className="h-10 p-4"
            type="text"
            name="instagram"
            id="instagram"
          />
        </div>
        <div className="flex justify-center gap-5 flex-wrap align-baseline">
          <button className=" rounded-lg self-center flex justify-center items-center text-lg text-gray-100 text-center  p-4 border-spacing-1 border-gray-600 border-2 mt-10 mb-10">
            {isSubmitting ? 'En ello...' : 'Dar de alta'}
          </button>
        </div>
      </Form>
    </div>
  )
}

export default PeludoForm
