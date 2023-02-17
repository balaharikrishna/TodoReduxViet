import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base :'https://balaharikrishna.github.io/TodoReduxViet/',
 //base:'http://localhost:4173/TodoReduxViet/',
 
})


