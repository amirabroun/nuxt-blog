import { Commit, MutationTree } from "vuex";
import { AppState, Toast } from ".";
import Vuetify from "../../plugins/vuetify";
import { AppMutationTypes } from "./mutation-types";

export const mutations: MutationTree<AppState> = {
  /**
   * Main Toast
   */
  [AppMutationTypes.showToast]: (state, toast: Toast) => {
    const { color, timeout, message } = toast;

    state.toast = {
      message,
      color,
      timeout,
      show: true,
    };
  },
  [AppMutationTypes.hideToast]: (state) => {
    state.toast.show = false;
  },
  [AppMutationTypes.resetToast]: (state) => {
    state.toast = {
      show: false,
      color: "black",
      message: "",
      timeout: 3000,
    };
  },
};

export const showToastSuccessMessage = (commit: Commit, message: string) => {
  commit(
    `app/${AppMutationTypes.showToast}`,
    {
      color: "success",
      message: message,
      show: true,
      timeout: 2000,
    } as Toast,
    { root: true }
  );
};

export const showToastErrorMessage = (commit: Commit, message: string) => {
  let errorMessage: string;
  if (!message) {
    errorMessage = "an error occurred";
  } else {
    errorMessage = message;
  }
  commit(
    `app/${AppMutationTypes.showToast}`,
    {
      color: "error",
      message: errorMessage,
      show: true,
      timeout: 4000,
    } as Toast,
    { root: true }
  );
};
