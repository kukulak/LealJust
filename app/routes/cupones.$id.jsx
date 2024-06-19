import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useRouteLoaderData
} from '@remix-run/react'

import Modal from '../components/Modal'
import CuponForm from '../components/CuponForm'
import { useEffect, useState } from 'react'
import { deleteCupon, updateCupon } from '../data/cupon.server'

const CuponesId = () => {
  const [estado, setEstado] = useState(true)

  const navigate = useNavigate()
  function closeHandler() {
    setEstado(!estado)
    //navigate programmatically
    navigate('..')
  }
  return (
    <div>
      <Modal estado={estado} onClose={closeHandler}>
        <CuponForm />
        {/* <CuponForm cuponData={cuponData} /> */}
      </Modal>
    </div>
  )
}

export default CuponesId

// export async function loader({ params, request }) {
//   const cuponId = params.id
//   return cuponId
// }

// export async function action({ params, request }) {
//   const formData = await request.formData()
//   console.log('request Form DATA ', formData)

//   return null
// }

export async function action({ params, request }) {
  const cuponId = params.id
  console.log('---PARAMS---', cuponId)
  // const getFormData = await request.formData()
  // console.log('la data de l forma', getFormData)
  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const cuponData = Object.fromEntries(formData)
    console.log(cuponData)
    await updateCupon(cuponId, cuponData)
    return redirect('/cupons')
  } else if (request.method === 'DELETE') {
    await deleteCupon(cuponId)
    return redirect('/cupons')
  }
  return null
}
