import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

if (process.env.NODE_ENV === "production") {
  config({ path: ".env.production" });
} else {
  config();
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
