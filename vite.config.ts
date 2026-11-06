import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths: the built site works at a sub-path
  // (https://yashwanthdhadi.github.io/my-portfolio/) or at a domain root,
  // so renaming the repo or adding a custom domain needs no change here.
  base: './',
  plugins: [react(), tailwindcss()],
})
