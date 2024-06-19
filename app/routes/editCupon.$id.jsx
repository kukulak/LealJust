import { Link, redirect, useLoaderData } from '@remix-run/react'
import { deleteCupon, getCuponById, updateCupon } from '../data/cupon.server'
import CuponForm from '../components/CuponForm'
import { getCategorias } from '../data/categoria.server'
import { getFormula } from '../data/formula.server'

const EditCupon = () => {
  // const cupon = useLoaderData()
  const { cupon, categorias, promociones } = useLoaderData()

  return (
    <section className="mt-10 max-w-[700px] flex flex-col justify-center items-center ">
      <div className="mt-10 mb-20 flex flex-col justify-center items-center gap-5">
        <p className="text-left uppercase text-xl ">
          Analítica y edición por cupón.
        </p>{' '}
        <p className="mb-10">
          Usado <span className="mx-2 text-lg">{cupon._count.used}</span>{' '}
          {cupon._count.used === 1 ? 'vez' : 'veces'}{' '}
        </p>
        <CuponForm
          cuponData={cupon}
          promociones={promociones}
          categorias={categorias}
        />
      </div>
    </section>
  )
}

export default EditCupon

export async function loader({ params, request }) {
  const cuponId = await params.id
  const categorias = await getCategorias()
  const promociones = await getFormula()
  const cupon = await getCuponById(cuponId)
  console.log('CUPON DATA', cupon)
  return { cupon, categorias, promociones }
}

export async function action({ request, params }) {
  const cuponId = params.id

  const formData = await request.formData()
  const cuponData = Object.fromEntries(formData)

  if (request.method === 'PATCH') {
    console.log('editTime', cuponData)
    await updateCupon(cuponId, cuponData)
    return redirect(`/editCupon/${cuponId}`)
  } else if (request.method === 'DELETE') {
    await deleteCupon(cuponId)
    return redirect('/cuponsList')
  }
}
