// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// 	preview: {
// 		port: 3000,
// 		host: true,
// 	},
// });

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import fs from "fs"

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  if (env.VITE_CONFIG_DEV === "True") {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      server: {
        host: "tg-mini-app.local",
        port: 443,
        https: {
          key: fs.readFileSync("./.cert/localhost-key.pem"),
          cert: fs.readFileSync("./.cert/localhost.pem"),
        },
      },
    }
  } else {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      preview: {
        port: 3000,
        host: true,
      },
    }
  }
})
