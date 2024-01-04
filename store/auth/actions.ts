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
    $httpsRequest(`auth/login`, {
      method: "POST",
      data: { username: username, password: password },
    })
      .then((res: any) => {
        if (res.status === 200) {
          commit(AuthMutationTypes.setLoggingInState, {
            isLoggingIn: false,
            status: Status.success,
          });
          commit(AuthMutationTypes.setAuthUser, res.data.user);

          commit(AuthMutationTypes.setToken, res.data.user.token);
          showToastSuccessMessage(commit, res.message);
        } else {
          showToastErrorMessage(commit, res.message);
        }
      })
      .catch((err) => {
        showToastErrorMessage(commit, err.message);
      })
      .finally(() => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: null,
        });
      });
  },
  [AuthActionTypes.logOut]: ({ commit }) => {
    commit(AuthMutationTypes.setLoggingOutState, {
      loggingOut: true,
      status: null,
    });
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`auth/logout`)
      .then(() => {
        commit(AuthMutationTypes.cleanAuthInfo);
        commit(AuthMutationTypes.setLoggingOutState, {
          loggingOut: false,
          status: Status.success,
        });
      })
      .catch(() => {
        commit(AuthMutationTypes.setLoggingOutState, {
          loggingOut: false,
          status: Status.failed,
        });
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
      data: { username, password, password_confirmation },
    })
      .then((res: any) => {
        console.log(res.status);
        if (res.status === 200) {
          commit(AuthMutationTypes.setLoggingInState, {
            isLoggingIn: false,
            status: Status.success,
          });
          commit(AuthMutationTypes.setAuthUser, res.data.user);
          commit(AuthMutationTypes.setToken, res.data.user.token);
          showToastSuccessMessage(commit, res.message);
        } else {
          showToastErrorMessage(commit, res);
        }
      })
      .catch((err) => {
        showToastErrorMessage(commit, err.message);
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
      .then((res: any) => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: Status.success,
        });
        commit(AuthMutationTypes.setAuthUser, res.data.user);
      })
      .catch(() => {
        commit(AuthMutationTypes.setLoggingInState, {
          isLoggingIn: false,
          status: Status.failed,
        });
      });
  },
};
