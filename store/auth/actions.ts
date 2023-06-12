import { ActionTree } from "vuex";
import { AuthState } from ".";
import { RootState, Status } from "..";
import { AuthActionTypes } from "./action-types";
import { AuthMutationTypes } from "./mutation-types";
export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  email: string;
  password: string;
  password_confirmation: string;
}
export const actions: ActionTree<AuthState, RootState> = {
  [AuthActionTypes.login]: ({ commit }, payload: LoginPayload) => {
    const { email, password } = payload;
    commit(AuthMutationTypes.setLoggingInState, {
      isLoggingIn: true,
      status: null,
    });
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`auth/login`, {
      method: "POST",
      body: { email: email, password: password },
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
  [AuthActionTypes.logOut]: ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`auth/logout`).then(() => {
      commit(AuthMutationTypes.cleanAuthInfo);
    });
  },
  [AuthActionTypes.register]: ({ commit }, payload: RegisterPayload) => {
    const { email, password, password_confirmation } = payload;
    commit(AuthMutationTypes.setLoggingInState, {
      isLoggingIn: true,
      status: null,
    });
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`auth/register`, {
      method: "POST",
      body: { email, password, password_confirmation },
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
