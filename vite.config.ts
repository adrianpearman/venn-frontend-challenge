import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    // mirrors tsconfig "paths"
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
