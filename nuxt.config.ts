// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.VUE_APP_ROOT_API,
    },
  },
};
