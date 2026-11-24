import tailwindcss from "@tailwindcss/vite";
import { artists, artistPath, artworks, artPath, collections, collectionPath } from "./app/data/catalog";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-24",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      htmlAttrs: { lang: "zh-Hant" },
      titleTemplate: "%s｜ART NFT",
      meta: [
        {
          name: "description",
          content: "探索 ART NFT 的藝術家、系列作品與市值排行。",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/images/logo.svg" }],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: [
        "/", "/explore", "/ranking", "/artist",
        ...artists.map(({ id }) => artistPath(id)),
        ...collections.map(({ id }) => collectionPath(id)),
        ...artworks.map(({ id }) => artPath(id)),
      ],
    },
  },
});
