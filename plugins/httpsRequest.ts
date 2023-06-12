import { useCookies } from "vue3-cookies";
import { store } from "~/store";
import {
  showToastErrorMessage,
  showToastSuccessMessage,
} from "~/store/app/mutations";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  let baseRoute = config.public.API_BASE_URL;
  return {
    provide: {
      httpsRequest: (url: string, options?: any) => {
        return new Promise((resolve, reject) => {
          if (process.client) {
            const { cookies } = useCookies();
            const bearerToken = cookies.get("theUserToken");
            const fetchOptions = {
              baseURL: baseRoute,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            };
            $fetch(url, { ...fetchOptions, ...options })
              .then((res: any) => {
                showToastSuccessMessage(store.commit, res.message);
                resolve(res);
              })
              .catch((error: any) => {
                showToastErrorMessage(store.commit, error.message);
                reject(error);
              });
          } else {
            reject(
              new Error("httpsRequest can only be called on the client side.")
            );
          }
        });
      },
    },
  };
});
