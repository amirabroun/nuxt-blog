import { store } from "~~/store";

export default defineNuxtRouteMiddleware((to) => {
  if (to.fullPath.includes("/users")) {
    return;
  } else if (to.fullPath.includes("/dashboard")) {
    if (!store.getters["auth/isAuth"]) {
      return navigateTo("/login");
    }
  } else if (to.fullPath === "/login" || to.fullPath === "/register") {
    if (store.getters["auth/isAuth"]) {
      return navigateTo("/");
    }
  }
});
