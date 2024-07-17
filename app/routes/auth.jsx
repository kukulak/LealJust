// import { redirect } from '@remix-run/node'
// import { useSearchParams } from '@remix-run/react'

import { useOutletContext } from "@remix-run/react";
import AuthForm from "../components/auth/AuthForm";
import { getUserFromSession, login, signup } from "../data/auth.server";

import { validateCredentials } from "../data/validation.server";
import { useEffect, useState } from "react";

// export const meta = () => {
//   return [
//     { title: 'Log In Human' },
//     {
//       name: 'description',
//       content: 'Registra al humano, despues ¡los perritos!'
//     }
//   ]
// }

export default function AuthPage() {
  const { userRole, changeClientId } = useOutletContext();

  console.log("USER ROLE CONTEXT", userRole);

  return (
    // <main className="p-8 flex justify-center w-screen items-center">
    <div className="mt-10  w-full items-center flex flex-col gap-5">
      <AuthForm signUp={false} userRole={userRole} />
    </div>
    // </main>
  );
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const usuarioActivo = await getUserFromSession(request);
  const formData = await request.formData();
  let credentials = Object.fromEntries(formData);
  const { name, email, password, whatsapp, colonia, municipio } =
    Object.fromEntries(formData);
  const updatedPassword =
    name.toLowerCase() + "@JustLikeHome@" + whatsapp.slice(-4);
  // talia@JustLikeHome@55256075
  if (usuarioActivo.role === "ADMIN") {
    credentials = {
      name,
      email,
      password: updatedPassword,
      whatsapp,
      colonia,
      municipio,
      role: usuarioActivo.role,
    };
  }

  //validate user input
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      // console.log("ITS LOGIN");
      // console.log({ authMode });
      // console.log(credentials);
      // return redirect('/dashboard')

      return await login(credentials);
    } else {
      console.log("ITS SIGNUP");
      return await signup(credentials);
      // return redirect('/dashboard')
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message };
    } else {
      return { credentials: error.message };
    }
    // console.log('EL ERROR DE LOGIN', error)
  }
}
