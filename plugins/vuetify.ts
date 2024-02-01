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
            medium: "#f1f4f6",
            dark: "#f2f2f2",
            darker: "#707070",
            light: "#f1f4f6",
            lighter: "#ffffff",
            "employee-green": "#33d15d",
            "employee-green-darker": "#53bf77",
            orange: "#f16b42"
          },
        }
      }
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
