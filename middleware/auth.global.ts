import { store } from "~/store";
import { useCookies } from "vue3-cookies";
import { AuthActionTypes } from "~/store/auth/action-types";

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;
  const { cookies } = useCookies();

  let authUser = store.getters["auth/getAuthUser"];
  if (authUser === null && cookies.get("theUserToken")) {
    await store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);

    authUser = store.getters["auth/getAuthUser"];
  }

  if (to.name === "users-uuid-edit") {
    if (authUser === null || to.params.uuid !== authUser.uuid) {
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }
  }
});
