import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    payloadExtraction: false,
  },
  app: {
    baseURL: "/predefined-json-editor/",
  },
  nitro: {
    preset: "github-pages",
  },
});
