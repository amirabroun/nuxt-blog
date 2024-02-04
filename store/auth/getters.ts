import { GetterTree } from "vuex";
import { AuthState } from ".";
import { RootState } from "..";
import { useCookies } from "vue3-cookies";

export const getters: GetterTree<AuthState, RootState> = {
  authHasToken: () => {
    const { cookies } = useCookies();
    
    return cookies.get("userToken") != null;
  },
  getAuthUser(state) {
    return state.authUser;
  },
};
