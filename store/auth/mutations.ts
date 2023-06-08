import { MutationTree } from "vuex";
import { AuthState, AuthUser } from ".";
import { Status } from "..";
import { AuthMutationTypes } from "./mutation-types";
import { useCookies } from "vue3-cookies";

export const mutations: MutationTree<AuthState> = {
  [AuthMutationTypes.setLoggingInState]: (
    state,
    { isLoggingIn, status }: { isLoggingIn: boolean; status: Status }
  ) => {
    state.isLoggingIn = isLoggingIn;
    state.status = status;
  },
  [AuthMutationTypes.setAuthUserInfo]: (state, authUser: AuthUser) => {
    state.authUser = authUser;
  },
  [AuthMutationTypes.setToken]: (state, theUserToken: string) => {
    state.theUserToken = theUserToken;

    const { cookies } = useCookies();

    cookies.set("theUserToken", theUserToken);
  },
  [AuthMutationTypes.cleanAuthInfo]: (state) => {
    const { cookies } = useCookies();
    state.authUser = null;
    state.isLoggingIn = false;
    state.status = null;
    state.theUserToken = null;
    cookies.remove("theUserToken");
  },

  [AuthMutationTypes.setLoadingAuthOrganizations]: (
    state,
    loading: boolean
  ) => {
    state.loadingOrganizations = loading;
  },

  // [AuthMutationTypes.setAuthOrganizations]: (
  //   state,
  //   organizations: any
  // ) => {
  //   state.organizations = organizations;
  // },
};
