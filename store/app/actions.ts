import { ActionTree } from "vuex";
import { AppState } from ".";
import { RootState } from "..";

export const actions: ActionTree<AppState, RootState> = {
  showToast: ({ state, commit }, message) => {
    if (state.toast.show) commit("hideToast");

    setTimeout(() => {
      commit("showToast", {
        color: "black",
        message,
        timeout: 3000,
      });
    });
  },

  showError: ({ state, commit }, { message = "Failed!", error }) => {
    if (state.toast.show) commit("hideToast");

    setTimeout(() => {
      commit("showToast", {
        color: "error",
        message: message + " " + error.message,
        timeout: 10000,
      });
    });
  },
  showSuccess: ({ state, commit }, message) => {
    if (state.toast.show) commit("hideToast");

    setTimeout(() => {
      commit("showToast", {
        color: "success",
        message,
        timeout: 3000,
      });
    });
  },
};
