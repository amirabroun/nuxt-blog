import { Module } from "vuex";
import { store, RootState, Status } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { AuthActionTypes } from "./action-types";
import { AuthMutationTypes } from "./mutation-types";
export interface AuthUser {
  avatar: string;
  created_at: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  updated_at: string;
  uuid: string;
}

export interface AuthState {
  isLoggingIn: boolean;
  authUser: AuthUser | null;
  userToken: string | null;
  organizationToken: string | null;
  status: Status | null;
  loadingOrganizations: boolean;
}

const state: AuthState = {
  authUser: null,
  isLoggingIn: false,
  userToken: null,
  organizationToken: null,
  status: null,
  loadingOrganizations: false,
};

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  actions: actions,
  mutations: mutations,
  getters,
};

export const authDispatch = <T = any>(
  action: keyof typeof AuthActionTypes,
  payload?: T
): Promise<any> => {
  return store.dispatch(`auth/${action}`, payload);
};

export const authCommit = <T = any>(
  mutation: keyof typeof AuthMutationTypes,
  payload?: T
) => {
  store.commit(`auth/${mutation}`, payload);
};
