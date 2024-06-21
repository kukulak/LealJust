import nodemailer from "nodemailer";

const MAIL_CREDENTIALS_P = process.env.MAIL_CREDENTIALS_P;

// Configuración del transporte de correo electrónico
const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net", // Cambia esto por el host SMTP de tu proveedor de correo
  port: 465, // Usa el puerto adecuado (587 para TLS, 465 para SSL, 25 para no seguro)
  secure: true, // Cambia a true para el puerto 465
  //
  // secureConnection: false, // TLS requires secureConnection to be false
  // tls: {
  //   ciphers: "SSLv3",
  // },
  // requireTLS: true,
  //
  // debug: true,
  auth: {
    user: "yaeshora@ahorraahora.app", // Tu dirección de correo electrónico
    pass: MAIL_CREDENTIALS_P, // Tu contraseña
  },
  logger: true,
  debug: true, // activo modo depuración
});

// var transporter = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "f4ffc5c0548e28",
//     pass: "6845fde17a98f5",
//   },
// });

export async function sendEmail({ to, subject, text, link, password }) {
  //
  const mailOptions = {
    from: '"Plan de Lealtad JustLikeHome" <yaeshora@ahorraahora.app> ', // Tu dirección de correo electrónico
    to,
    subject,
    text,
    html: `<p>${text}</p> <a styles=" padding: 10px; background-color: #030712; color: white" href=${link}> Activa tu cuenta </a> <p>O copia este link para activarla:</p> <p>${link}</p> <p>Para entrar usa el mail que registraste.</p> <p>Aqui tu password:</p><p>${password}</p> <p>Para mayor seguridad, actualiza este password.</p> `,
  };
  //
  console.log(to, subject, text);
  //

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado con éxito");
  } catch (error) {
    console.log("Error al enviar correo electrónico:", error);
  }
}
