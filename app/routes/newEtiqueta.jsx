import {
  Form,
  Link,
  redirect,
  useNavigation,
  useParams,
  useNavigate
} from '@remix-run/react'
// import { validateCredentials } from '../data/validation.server'

import { newEtiqueta } from '../data/etiqueta.server'
import { requireUserSession } from '../data/auth.server'
import EtiquetaForm from '../components/EtiquetaForm'

const CreateEtiqueta = () => {
  const navigate = useNavigate()
  return (
    <main className="w-full items-center flex flex-col gap-5">
      <EtiquetaForm />
      <div className="w-full items-center flex flex-col gap-5">
        <button
          className=" bg-gray-800 w-[150px] self-center text-2xl text-gray-100 text-center p-3 mt-10 mb-20 "
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </div>
    </main>
  )
}

export default CreateEtiqueta

export async function action({ request }) {
  const userId = await requireUserSession(request)
  console.log(userId.userId, 'by REQUEST')

  const formData = await request.formData()
  const dataEtiqueta = Object.fromEntries(formData)
  try {
    await newEtiqueta(dataEtiqueta, userId.userId)
    console.log('action processed', dataEtiqueta.nombre)
    return redirect('/')
  } catch (error) {
    console.log(error)
    if (error.status === 422) {
      return { dataEtiqueta: error.message }
    } else {
      return { dataEtiqueta: error.message }
    }
  }
}
