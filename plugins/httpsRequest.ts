import { store } from "~/store";
import {
  showToastErrorMessage,
  showToastSuccessMessage,
} from "~/store/app/mutations";
export default defineNuxtPlugin(() => {
  return {
    provide: {
      httpsRequest: (url: string, options: any) => {
        return new Promise((resolve, reject) => {
          //@ts-ignore
          $apiFetch(url, options)
            .then((res: any) => {
              showToastSuccessMessage(store.commit, "success");
              resolve(res);
            })
            .catch((res: any) => {
              showToastErrorMessage(store.commit, "failed");
              reject(res);
            });
        });
      },
    },
  };
});
