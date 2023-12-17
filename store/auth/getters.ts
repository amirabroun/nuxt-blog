import { GetterTree } from "vuex";
import { AuthState } from ".";
import { RootState } from "..";

export const getters: GetterTree<AuthState, RootState> = {
  isAuth: (state) => {
    if (state.theUserToken) {
      return true;
    } else {
      return false;
    }
  },
  theUserToken: (state) => {
    if (state.theUserToken) {
      return state.theUserToken;
    } else {
      return null;
    }
  },
};
