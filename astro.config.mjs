import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  output: "server",
  adapter: vercel(),
});
