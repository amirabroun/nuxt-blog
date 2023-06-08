import { GetterTree } from "vuex";
import { AuthState } from ".";
import { RootState } from "..";
import { useCookies } from "vue3-cookies";

export const getters: GetterTree<AuthState, RootState> = {
  isAuth: (state) => {
    const { cookies } = useCookies();
    if (state.theUserToken || cookies.get("theUserToken")) {
      return true;
    } else {
      return false;
    }
  },
  theUserToken: (state) => {
    const { cookies } = useCookies();

    if (state.theUserToken) {
      return state.theUserToken;
    } else if (cookies.get("theUserToken")) {
      return cookies.get("theUserToken");
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
