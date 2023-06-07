import { useCookies } from "vue3-cookies";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  let baseRoute = config.public.API_BASE_URL;
  if (process.client) {
    const { cookies } = useCookies();
    const bearerToken = cookies.get("theUserToken");
    const fetchOptions = {
      baseURL: baseRoute,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const apiFetch = $fetch.create(fetchOptions);
    nuxtApp.provide("apiFetch", apiFetch);
  }
});
