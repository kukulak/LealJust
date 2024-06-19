import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";

export default defineConfig({
  plugins: [remix(), netlifyPlugin(), tsconfigPaths()],
  build: {
    rollupOptions: {
      external: ["compressorjs", "react-qrcode-logo"], // Añade compressorjs como un módulo externo
    },
  },
});
