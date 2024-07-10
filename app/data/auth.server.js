import { prisma } from "./database.server";
// import { hash, compare } from 'bcryptjs'
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { randomBytes } from "crypto";

import { sendEmail } from "./email.server"; // Función para enviar emails

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session_MC",
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, //30 days
    httpOnly: true,
    path: "/",
  },
});

async function createUserSession(userId, userName, userRole, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  session.set("userName", userName);
  session.set("userRole", userRole);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

async function newUserId(userId, redirectPath) {
  redirect(redirectPath);
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  let userId = session.get("userId");
  const userName = session.get("userName");
  const role = session.get("userRole");
  if (!userId) {
    console.log("NO SESSION");
    // return redirect("/");
    return (userId = null);
  }

  return { userId, userName, role };
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect("/login");
    // throw redirect('/auth?mode=login')
  }

  return userId;
}

export function generateToken() {
  return randomBytes(32).toString("hex");
}

export async function signup({
  email,
  password,
  name,
  whatsapp,
  colonia,
  municipio,
  role,
}) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    const error = new Error("Esta dirección de email ya está registrada");
    error.status = 422;
    throw error;
  }

  const activationToken = generateToken();
  const tokenExpiry = new Date();
  tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token válido por 24 horas

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
      whatsapp: whatsapp,
      colonia: colonia,
      municipio: municipio,
      activationToken,
      tokenExpiry,
    },
  });

  const activationLink = `https://jlhlealtad.com/activate/${activationToken}`;

  await sendEmail({
    to: email,
    subject: "Activa tu cuenta",
    text: "Da clic en el siguiente enlace para activar tu cuenta: ",
    link: activationLink,
    password: password,
  });

  if (role === "ADMIN") {
    return redirect(`/newRegistroPeludo/${user.id}`);
    // return newUserId(user.id, '/newPeludo')
  } else {
    return createUserSession(user.id, user.name, user.role, "/newPeludo");
  }
}

export async function getUser(userId) {
  const existingUser = await prisma.user.findFirst({ where: { id: userId } });

  if (!existingUser) {
    // return redirect('/notFound')
    const error = new Error(
      "User doesn't Exist, tell us who are you how you get here",
    );
    error.status = 401;
    throw error;
  }

  const data = {
    name: existingUser.name,
    createdAt: existingUser.createdAt,
    email: existingUser.email,
    role: existingUser.role,
    whatsapp: existingUser.whatsapp,
    colonia: existingUser.colonia,
    municipio: existingUser.municipio,
    puntos: existingUser.puntos,
  };

  return data;
}

export async function getHumanoByName(name) {
  const humano = await prisma.user.findMany({ where: { name } });
  return humano;
}

export async function getUsers() {
  console.log("IAMINGETUSERS");
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      const error = new Error(
        "User doesn't Exist, tell us who are you how you get here",
      );
      error.status = 401;
      return redirect("/notFound");
      throw error;
    }

    console.log("DATA GET USERS", { users });
    return users;
  } catch (error) {
    throw new Error("GETTING THE USERS FAILED.");
  }
}

export async function updateUser(id, userData) {
  console.log("UPDATE USER", id, userData);
  const dataToUpdate = {
    name: userData.name,
    email: userData.email,
    whatsapp: userData.whatsapp,
    colonia: userData.colonia,
    municipio: userData.municipio,
    role: userData.role,
  };
  if (userData.password && userData.password.length >= 1) {
    dataToUpdate.password = await hash(userData.password, 12);
  }

  try {
    await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error("Error al actualizar el usuario");
  }
}

export async function deleteUser(id) {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to delete USER");
  }
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error("Prueba con otras credenciales");
    error.status = 401;
    throw error;
  }
  console.log("ERROR -----  HORRROR FROM");

  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    const error = new Error("Las credenciales no son correctas.");
    error.status = 401;
    throw error;
  }

  return createUserSession(
    existingUser.id,
    existingUser.name,
    existingUser.role,
    existingUser.role === "ADMIN"
      ? "/homeAdmin"
      : `/humanProfile/${existingUser.id}`,
  );
}

export async function getTotalUsers() {
  try {
    const totalUsers = await prisma.user.count();
    return totalUsers;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePuntos(peludoId, puntos) {
  const peludo = await prisma.peludo.findUnique({ where: { id: peludoId } });
  const user = await prisma.user.findUnique({
    where: { id: peludo.usuarioId },
  });
  // const puntosActuales = user.puntos
  try {
    const updatePuntos = await prisma.user.update({
      where: { id: user.id },
      data: { puntos: (Number(user.puntos) + puntos).toString() },
    });
    return updatePuntos;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function reducirPuntos(userId, puntos) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  // const puntosActuales = user.puntos
  try {
    const updatePuntos = await prisma.user.update({
      where: { id: user.id },
      data: { puntos: (Number(user.puntos) - puntos).toString() },
    });
    return updatePuntos;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function updateUser(id, userData) {
//   console.log('UPDATE USER', id, userData)
//   try {
//     await prisma.user.update({
//       where: { id },
//       data: {
//         name: userData.name,
//         email: userData.email,
//         whatsapp: userData.whatsapp,
//         colonia: userData.colonia,
//         municipio: userData.municipio,
//         role: userData.role
//       }
//     })
//   } catch (error) {
//     throw new Error('Failed to update user.')
//   }
// }
