import type {
  MetaFunction,
  LoaderFunctionArgs,
  LinksFunction,
  ActionFunctionArgs
} from '@remix-run/node'
import Intro from '../components/Intro'
import { Link, Links, useLoaderData, useNavigate } from '@remix-run/react'
import { getUserFromSession } from '~/data/auth.server'
import { useEffect } from 'react'
import BurgerMenu from '~/components/BurgerMenu'
import { getAllPeludosByUser } from '../data/peludo.server'
export const meta: MetaFunction = () => {
  return [
    { title: 'Programa de Lealtad Just Like Home' },
    { name: 'description', content: 'Programa de lealtad' }
  ]
}

import loJLH from '/img/lo-JLH-hrz-big.png'

export default function Index() {
  const navigate = useNavigate()

  const { user, perritos } = useLoaderData()

  // useEffect(() => {
  //   if (user?.userId) {
  //     if (user.role === 'ADMIN') {
  //       navigate(`/homeAdmin`)
  //     } else if (user.role === 'USER') {
  //       navigate(`/humanProfile/${user.userId}`)
  //     }
  //   }
  // }, [user, navigate])

  return (
    <>
      {/* {user?.userId && <BurgerMenu userId={user?.userId} />} */}
      <div className=" animate-buscador flex flex-col items-center content-center justify-center h-screen bg-gray-950 ">
        {/* <Intro /> */}
        <section className=" -mt-52 flex flex-col gap-2 justify-center items-center">
          <h2 className="font-montserrat text-2xl ">Bienvenido </h2>
          <h2 className="font-montserrat text-3xl -my-2">al Programa </h2>
          <h2 className="font-montserrat text-5xl ">de lealtad </h2>
          {/* <h1 className="font-montserrat text-4xl font-extrabold">
            Just Like Home
          </h1> */}
          <img
            className=" w-11/12 max-w-[400px] mt-7"
            src={loJLH}
            alt="logo Just Like Home"
          />
          <p className="text-lg">El hub para tus perritos</p>
        </section>
        {user?.role === 'USER' && (
          <section className="mt-10 flex flex-col gap-5 items-center">
            {/* <Link to="/login">
              ¿Tienes cuenta?{' '}
              <span className=" decoration-solid underline">
                pasa por aquí.
              </span>
            </Link> */}
            Mira los cupones de
            <div className="flex justify-center">
              <div className="flex ">
                {perritos.map(perrito => (
                  <Link
                    to={`profile/${perrito.id}`}
                    key={perrito.id}
                    className="w-30 h-30 rounded-full overflow-hidden"
                  >
                    <img
                      className=" object-fill w-36 h-36"
                      alt="perritos"
                      src={perrito.foto}
                    />{' '}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              className=" text-center mt-10 flex flex-col gap-5 items-center"
              to="/login"
            >
              <br /> y empieza a recibir beneficios.{' '}
            </Link>
          </section>
        )}

        {!user?.role && (
          <section className="mt-10 flex flex-col gap-5 items-center">
            <Link to="/login">
              ¿Tienes cuenta?{' '}
              <span className=" decoration-solid underline">
                pasa por aquí.
              </span>
            </Link>
            <Link
              className=" text-center mt-10 flex flex-col gap-5 items-center"
              to="/login"
            >
              Si quieres una cuenta <br />
              ven a Just Like Home
              <br /> y empieza a recibir beneficios.{' '}
            </Link>
          </section>
        )}

        {user?.role === 'ADMIN' && (
          <section className="mt-10 flex flex-col gap-5 items-center">
            <Link to="/login">
              ¿Tienes cuenta?{' '}
              <span className=" decoration-solid underline">
                pasa por aquí.
              </span>
            </Link>
          </section>
        )}
      </div>
    </>
  )
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromSession(request)
  // const userId = user.userId
  let perritos = {}
  if (user?.userId) {
    perritos = await getAllPeludosByUser(user.userId)
  }
  return { user, perritos }
}
