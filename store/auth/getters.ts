import { GetterTree } from "vuex";
import { AuthState } from ".";
import { RootState } from "..";

export const getters: GetterTree<AuthState, RootState> = {
  isAuth: (state) => {
    if (state.isLoggingIn) {
      return true;
    } else {
      return false;
    }
  },
  getAuthUser(state) {
    return state.authUser;
  },
};
