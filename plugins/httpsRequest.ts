import axios from "axios";
import { useCookies } from "vue3-cookies";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  let baseRoute = config.public.API_BASE_URL;

  return {
    provide: {
      httpsRequest: (url: string, options?: any) => new Promise((resolve, reject) => {
        const { cookies } = useCookies();
        const bearerToken = cookies.get("theUserToken");
        const config = {
          baseURL: baseRoute,
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            Accept: `application/json`
          }, ...options
        }

        axios(url, config)
          .then((response: any) => { resolve(response.data) })
          .catch((error: any) => { reject(error.response) });
      })
    },
  };
});
