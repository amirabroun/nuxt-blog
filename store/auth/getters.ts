import { GetterTree } from "vuex";
import { AuthState } from ".";
import { RootState } from "..";

export const getters: GetterTree<AuthState, RootState> = {
  getAuthUser(state) {
    return state.authUser;
  },
};
