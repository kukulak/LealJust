import { Form, useNavigation } from '@remix-run/react'

const CategoriaForm = () => {
  const navigation = useNavigation()

  const isSubmitting = navigation.state !== 'idle'

  return (
    <Form
      method="post"
      className="w-11/12 md:w-2/5 m-20 flex-col flex gap-5 text-gray-800"
    >
      <div className="Nombre ">
        <label className=" text-gray-100" htmlFor="nombre">
          {' '}
          Nombre{' '}
        </label>
        <input className="h-10 p-4 w-full" type="text" name="nombre" />
      </div>
      <button className=" bg-gray-800 h-[130px] w-[130px] rounded-full self-center flex justify-center items-center text-xl text-gray-100 text-center  p-4 border-spacing-1 border-gray-400 border-2 mt-10 mb-20">
        {isSubmitting ? 'En ello...' : 'Crear Categoría'}
      </button>
    </Form>
  )
}

export default CategoriaForm
