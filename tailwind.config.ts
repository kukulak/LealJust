import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{html,js, jsx, ts, tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        light: "#F5F8FD",
        medium: "#9698A2",
        dark: "#4F555F",
        darkest: "#444A53",
      },
      keyframes: {
        mensaje: {
          "0%": { transform: " translateX(10px)", opacity: "1" },
          "100%": { transform: " translateX(0)", opacity: "1" },
        },
        placa: {
          "0%": { transform: " translateX(-10px)", opacity: "1" },
          "100%": { transform: " translateX(0)", opacity: "1" },
        },
        buscador: {
          "0%": { transform: " translateY(-10px)", opacity: "0" },
          "100%": { transform: " translateY(0)", opacity: "1" },
        },
        especifica: {
          "0%": {
            transform: " translateY(-10px)",
            opacity: "1",
            height: "0px",
            padding: "0px",
          },
          "100%": {
            transform: " translateY(0)",
            opacity: "1",
            height: "50px",
            padding: "2px",
          },
        },
        nota: {
          "0%": {
            transform: " translateX(10px)",
            opacity: "0",
          },
          "100%": {
            transform: " translateX(0px)",
            opacity: "1",
          },
        },
      },
      animation: {
        mensaje: "mensaje 0.2s ease-in-out",
        placa: "placa 0.2s ease-in-out",
        buscador: "buscador 1.2s ease-in-out",
        especifica: "especifica 0.2s ease-in-out",
        nota: "nota 0.2s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
