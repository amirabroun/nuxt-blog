import { GetterTree } from "vuex";
import { AuthState } from ".";
import { RootState } from "..";
import { useCookies } from "vue3-cookies";

export const getters: GetterTree<AuthState, RootState> = {
  isAuth: (state) => {
    const { cookies } = useCookies();
    if (state.userToken || cookies.get("userToken")) {
      return true;
    } else {
      return false;
    }
  },
  userToken: (state) => {
    const { cookies } = useCookies();

    if (state.userToken) {
      return state.userToken;
    } else if (cookies.get("userToken")) {
      return cookies.get("userToken");
    } else {
      return "";
    }
  },
  organizationToken: (state) => {
    const { cookies } = useCookies();
    if (state.organizationToken) {
      return state.organizationToken;
    } else if (cookies.get("organizationToken")) {
      return cookies.get("organizationToken");
    } else {
      return "";
    }
  },
};
