import { sveltekit } from "@sveltejs/kit/vite";
import { config } from "dotenv";
import { resolve } from "path";
import { defineConfig } from "vite";

config({ path: resolve(__dirname, ".env") });
config({ path: resolve(__dirname, ".env.local") });

export default defineConfig({
  plugins: [sveltekit()],
});
