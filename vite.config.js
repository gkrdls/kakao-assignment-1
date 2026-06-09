import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // React의 JSX 변환과 Tailwind CSS 처리를 Vite 플러그인으로 연결합니다.
  plugins: [react(), tailwindcss()],
});
