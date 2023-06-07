import { Module } from "vuex";
import { store, RootState } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { AppActionTypes } from "./action-types";
import { AppMutationTypes } from "./mutation-types";

export interface Toast {
  show: boolean;
  color: string;
  message: string;
  timeout: number;
}
export interface AppState {
  toast: Toast;
}

// state initial values
const state: AppState = {
  toast: {
    show: false,
    color: "black",
    message: "",
    timeout: 3000,
  },
};

export const app: Module<AppState, RootState> = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
};

export const appDispatch = <T = any>(
  action: keyof typeof AppActionTypes,
  payload?: T
): Promise<any> => {
  return store.dispatch(`app/${action}`, payload);
};

export const appCommit = <T = any>(
  mutation: keyof typeof AppMutationTypes,
  payload?: T
): void => {
  store.commit(`app/${mutation}`, payload);
};
