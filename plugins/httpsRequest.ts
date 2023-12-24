import axios from "axios";
import { useCookies } from "vue3-cookies";

interface Headers {
  Accept: string;
  Authorization?: string;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  let baseRoute = config.public.API_BASE_URL;

  return {
    provide: {
      httpsRequest: (url: string, options?: any) =>
        new Promise((resolve, reject) => {
          const { cookies } = useCookies();
          const bearerToken: string = cookies.get("theUserToken");
          let headers: Headers = {
            Accept: `application/json`,
          };
          if (bearerToken) {
            headers.Authorization = `Bearer ${bearerToken}`;
          }
          const config = {
            baseURL: baseRoute,
            headers,
            ...options,
          };

          axios(url, config)
            .then((response: any) => {
              resolve(response.data);
            })
            .catch((error: any) => {
              reject(error.response);
            });
        }),
    },
  };
});
