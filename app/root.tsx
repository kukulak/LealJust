import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import type { LoaderFunctionArgs, LinksFunction } from '@remix-run/node'
import MenuMobile from './components/MenuMobile'
import { getUserFromSession } from '../app/data/auth.server'

import BurgerMenu from './components/BurgerMenu'

import styles from '~/tailwind.css?url'
import { useEffect, useState } from 'react'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

function Document({
  children,
  userId,
  userName,
  userRole
}: {
  children: React.ReactNode
}) {
  return (
    <html className=" font-sans" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className=" bg-gray-950 text-gray-200 flex justify-center">
        {userId && (
          <BurgerMenu role={userRole} userName={userName} userId={userId} />
        )}

        <section className=" pt-1 flex flex-col justify-center w-full items-center">
          {children}
        </section>
        <MenuMobile userId={userId} />
        <ScrollRestoration />
        <Scripts />
        {/* 
        <Form className="mt-12" method="post" action="/logout" id="logout-form">
          <button type="submit">Log Out</button>
        </Form> */}
      </body>
    </html>
  )
}

export default function App() {
  const loaderData = useLoaderData()

  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    setUserId(loaderData?.userId)
    setUserName(loaderData?.userName)
    setUserRole(loaderData?.role)
  }, [loaderData?.userId, loaderData?.userName, loaderData?.userRole])

  // clienteId peludoId

  const [clienteId, setClienteId] = useState(loaderData?.userId)
  const [peludoId, setPeludoId] = useState([])

  const changeClientId = id => {
    setClienteId(id)
  }

  return (
    <Document userName={userName} userId={userId} userRole={userRole}>
      <Outlet
        context={{
          userRole,
          clienteId,
          peludoId,
          changeClientId,
          setClienteId
        }}
      />
    </Document>
  )
}

// export function ErrorBoundary() {
//   const error = useRouteError()

//   if (isRouteErrorResponse(error)) {
//     return (
//       <Document>
//         <Error title={error.status}>
//           <p>{error.data?.message || 'Not found'}</p>
//           <p className=" my-5">
//             Back to{' '}
//             <Link className=" font-bold text-lg" to="/">
//               safty
//             </Link>
//             .
//           </p>
//         </Error>
//       </Document>
//     )
//   }
//   let errorMessage = 'Unknown error'
//   if (error) {
//     errorMessage = error.message
//   }

//   return (
//     <Document title={errorMessage}>
//       <Error title={errorMessage}>
//         <p>{'Something went rong'}</p>
//         {/* <p>{errorMessage || 'Something went rong'}</p> */}
//         <p className=" my-5">
//           Back to{' '}
//           <Link className=" font-bold text-lg" to="/">
//             safety
//           </Link>
//           .
//         </p>
//       </Error>
//     </Document>
//   )
// }

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromSession(request)
  // const userId = user.userId
  return user
}

// export default function App() {
//   return <Outlet />
// }

// export function Layout({ children }: { children: React.ReactNode }) {
//   const loaderData = useLoaderData()

//   const [userId, setUserId] = useState('')
//   useEffect(() => {
//     setUserId(loaderData?.userId)
//   }, [])

//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body className="font-montserrat bg-[#131b28] text-gray-100 ">
//         <BurgerMenu userId={userId} />
//         <section className=" pt-1 ">{children}</section>
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   )
// }

// export default function App() {
//   return <Outlet />
// }

// export async function loader({ request }: LoaderFunctionArgs) {
//   const user = getUserFromSession(request)
//   // const userId = user.userId
//   return user
// }
