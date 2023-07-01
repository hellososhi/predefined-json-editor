import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    payloadExtraction: false,
  },
  app: {
    baseURL: "/predefined-json-editor/",
    head: {
      title: "Predefined JSON Editor",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/predefined-json-editor/favicon.ico" }],
    },
  },
  nitro: {
    preset: "github-pages",
  },
});
