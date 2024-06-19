import { Form } from '@remix-run/react'

const invitar = () => {
  return (
    <div className=" mt-12 flex flex-col items-center gap-5">
      <p className="text-2xl w-10/12">Ingresa el whatsapp de tu amigo</p>
      <Form className=" w-10/12 flex flex-col gap-3 text-gray-900">
        <label className=" text-gray-100" htmlFor="number">
          {' '}
          WhatsApp{' '}
        </label>
        <input className="h-10 p-4" type="number" name="number" />
      </Form>
      <a
        className=" bg-gray-800 w-[150px] self-center text-2xl text-gray-100 text-center p-3 mt-10 mb-20 "
        href="/profile"
      >
        {' '}
        Invitar{' '}
      </a>
      <div className="flex flex-col items-center gap-5">
        <p className="text-xl w-10/12">
          También si quieres puedes compartirle tu código personal, así cuando
          tu amigo nos de tu referencia, se desbloquea tu cupón
        </p>

        <div className="w-10/12 p-3 bg-gray-600 text-gray-100 flex justify-center ">
          <p className="text-l ">Rocket@JustLikeHome2405B</p>
        </div>
      </div>
    </div>
  )
}

export default invitar
