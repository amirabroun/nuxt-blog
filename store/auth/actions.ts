import { ActionTree } from "vuex";
import { AuthState } from ".";
import { RootState, Status } from "..";
import { AuthActionTypes } from "./action-types";
import { AuthMutationTypes } from "./mutation-types";
import { useCookies } from "vue3-cookies";

export interface LoginPayload {
  username: string;
  password: string;
}
export interface RegisterPayload {
  username: string;
  password: string;
  password_confirmation: string;
}
export const actions: ActionTree<AuthState, RootState> = {
  [AuthActionTypes.login]: ({ commit }, payload: LoginPayload) => {
    const { username, password } = payload;
    commit(AuthMutationTypes.setLoggingInState, {
      isLoggingIn: true,
      status: null,
    });
    const { $httpsRequest } = useNuxtApp();
    const { cookies } = useCookies();
    $httpsRequest(`auth/login`, {
      method: "POST",
      body: { username: username, password: password },
    })
      .then((res: any) => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: Status.success,
        });
        commit(AuthMutationTypes.setAuthUserInfo, res.data.user);

        cookies.set("theUserUuid", res.data.user.uuid);
        commit(AuthMutationTypes.setToken, res.data.user.token);
      })
      .finally(() => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: null,
        });
      });
  },
  [AuthActionTypes.logOut]: ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`auth/logout`).then(() => {
      commit(AuthMutationTypes.cleanAuthInfo);
    });
  },
  [AuthActionTypes.register]: ({ commit }, payload: RegisterPayload) => {
    const { username, password, password_confirmation } = payload;
    commit(AuthMutationTypes.setLoggingInState, {
      isLoggingIn: true,
      status: null,
    });
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`auth/register`, {
      method: "POST",
      body: { username, password, password_confirmation },
    })
      .then((res: any) => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: Status.success,
        });
        commit(AuthMutationTypes.setAuthUserInfo, res.data.user);
        commit(AuthMutationTypes.setToken, res.data.user.token);
      })
      .finally(() => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: null,
        });
      });
  },
  [AuthActionTypes.fetchAuthUser]: ({ commit }) => {
    commit(AuthMutationTypes.setLoggingInState, {
      isLoggingIn: true,
      status: null,
    });
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`auth/account`, { method: "GET" })
      .then(() => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: Status.success,
        });
      })
      .catch(() => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: Status.failed,
        });
      });
  },
};
