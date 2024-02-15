import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/dist/vuetify.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#0C356A",
            secondary: "#707070",
            info: "#0783f1",
            success: "#4caf50",
            light: "#f1f4f6",
          },
        }
      }
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
