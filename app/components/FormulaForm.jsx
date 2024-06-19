import { Form, useNavigation } from '@remix-run/react'
const FormulaForm = () => {
  const navigation = useNavigation()

  const isSubmitting = navigation.state !== 'idle'

  return (
    <div className="  w-full items-center flex flex-col gap-5">
      <Form
        method="post"
        // method={peludoData ? 'patch' : 'post'}
        className=" mt-20  w-10/12 flex flex-col gap-3 text-gray-900"
      >
        {/* //peludo */}
        <div className=" w-12/12 flex flex-col gap-3 text-gray-900 bg-gray-600 p-3">
          <label className=" text-gray-100" htmlFor="nombre">
            Nombre de la Fórmula
          </label>
          <input
            className="h-10 p-4"
            type="text"
            name="nombre"
            id="nombre"
            autoComplete={true}
          />
          <label className=" text-gray-100" htmlFor="formula">
            Fórmula
          </label>
          <input className="h-10 p-4" type="text" name="formula" id="formula" />
        </div>
        <div className="flex justify-center gap-5 flex-wrap align-baseline">
          {/* <button
            className=" bg-gray-800 h-[110px] w-[110px] rounded-full self-center flex justify-center items-center text-sm text-gray-100 text-center  p-[0.7rem] border-spacing-1 border-gray-400 border-2 mt-10 mb-20 "
            href="/humanProfile"
          ></button> */}

          <button className=" bg-gray-800 h-[130px] w-[130px] rounded-full self-center flex justify-center items-center text-xl text-gray-100 text-center  p-4 border-spacing-1 border-gray-400 border-2 mt-10 mb-20">
            {isSubmitting ? 'En ello...' : 'Crear Fórmula'}
          </button>
        </div>
      </Form>
    </div>
  )
}

export default FormulaForm

//Porcentaje ($ * cantidad) / 100
//Dinero fija ($ * cantidad)
//LLEVAPAGA cantidad de servicios * cantidad de servicios
//BOGO Producto = freeProducto
