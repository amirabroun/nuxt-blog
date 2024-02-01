import { store } from "~/store";
import { AuthActionTypes } from "~/store/auth/action-types";
import { useCookies } from "vue3-cookies";

export default defineNuxtPlugin((nuxtApp) => {
  const { cookies } = useCookies();
  nuxtApp.hook("app:beforeMount", async () => {
    if (!cookies.get("theUserToken")) return;
    await store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
  });
});
