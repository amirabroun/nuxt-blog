// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  modules: ["nuxt-swiper", "@pinia/nuxt"],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.VUE_APP_ROOT_API,
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
};
