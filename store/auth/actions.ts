import { ActionTree } from "vuex";
import { AuthState } from ".";
import { RootState, Status } from "..";
import { AuthActionTypes } from "./action-types";
import { AuthMutationTypes } from "./mutation-types";
import {
  showToastErrorMessage,
  showToastSuccessMessage,
} from "../app/mutations";
export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  email: string;
  password: string;
  password_confirmation: string;
}

// import {
//   showToastErrorMessage,
//   showToastSuccessMessage,
// } from "../app/mutations";
export const actions: ActionTree<AuthState, RootState> = {
  [AuthActionTypes.login]: ({ commit }, payload: LoginPayload) => {
    const { email, password } = payload;
    commit(AuthMutationTypes.setLoggingInState, {
      isLoggingIn: true,
      status: null,
    });
    const { $apiFetch } = useNuxtApp();
    //@ts-ignore
    $apiFetch(`auth/login`, {
      method: "POST",
      body: { email: email, password: password },
    }).then((res: any) => {
      console.log(res);
      commit(AuthMutationTypes.setLoggingInState, {
        isLoggingIn: false,
        status: Status.success,
      });
      commit(AuthMutationTypes.setAuthUserInfo, res.user);
      commit(AuthMutationTypes.setToken, res.token);
    });
  },
  [AuthActionTypes.logOut]: ({ commit }) => {
    const { $apiFetch } = useNuxtApp();
    //@ts-ignore
    $apiFetch(`auth/logout`).then(() => {
      commit(AuthMutationTypes.cleanAuthInfo);
    });
  },
  [AuthActionTypes.register]: ({ commit }, payload: RegisterPayload) => {
    const { email, password, password_confirmation } = payload;
    commit(AuthMutationTypes.setLoggingInState, {
      isLoggingIn: true,
      status: null,
    });
    const { $apiFetch } = useNuxtApp();
    //@ts-ignore
    $apiFetch(`auth/register`, {
      method: "POST",
      body: { email, password, password_confirmation },
    }).then((res: any) => {
      console.log(res);
      commit(AuthMutationTypes.setLoggingInState, {
        isLoggingIn: false,
        status: Status.success,
      });
    });
  },
  [AuthActionTypes.fetchAuthUser]: ({ commit }) => {
    commit(AuthMutationTypes.setLoggingInState, {
      isLoggingIn: true,
      status: null,
    });
    const { $apiFetch } = useNuxtApp();
    //@ts-ignore
    $apiFetch(`auth/account`)
      .then((res: any) => {
        console.log(res);
        showToastSuccessMessage(commit, "test");
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: Status.success,
        });
        // commit(AuthMutationTypes.setAuthUserInfo,)
      })
      .catch((res: any) => {
        showToastErrorMessage(commit, "test");
      });
  },
};
