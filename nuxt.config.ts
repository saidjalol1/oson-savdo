// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    public: {
      apiBase: 'https://oson-back-end.onrender.com',
    },
  },

  modules: ['@nuxt/image'],
  
  // Add build transpilation for chart.js
  build: {
    transpile: ['chart.js']
  }

})
