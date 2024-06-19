import {
  Form,
  Link,
  redirect,
  useNavigation,
  useParams
} from '@remix-run/react'
// import { validateCredentials } from '../data/validation.server'

import { newCategoria } from '../data/categoria.server'
import { requireUserSession } from '../data/auth.server'
import CategoriaForm from '../components/CategoriaForm'

const CreateCategoria = () => {
  return (
    <main className="w-full items-center flex flex-col gap-5">
      <CategoriaForm />
      <div className="w-full items-center flex flex-col gap-5">
        <a
          className=" bg-gray-800 w-[150px] self-center text-2xl text-gray-100 text-center p-3 mt-10 mb-20 "
          href="/"
        >
          Regresar
        </a>
      </div>
    </main>
  )
}

export default CreateCategoria

export async function action({ request }) {
  const userId = await requireUserSession(request)
  console.log(userId.userId, 'by REQUEST')

  const formData = await request.formData()
  const dataCategoria = Object.fromEntries(formData)
  try {
    await newCategoria(dataCategoria, userId.userId)
    console.log('action processed', dataCategoria.nombre)
    return redirect('/')
  } catch (error) {
    console.log(error)
    if (error.status === 422) {
      return { dataCategoria: error.message }
    } else {
      return { dataCategoria: error.message }
    }
  }
}
