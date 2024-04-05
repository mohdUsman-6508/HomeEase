import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  //yahan par proxy add kar rahe he baar baar http://localhost na likhna pade isliye

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
