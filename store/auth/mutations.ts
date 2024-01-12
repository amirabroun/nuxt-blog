import { MutationTree } from "vuex";
import { AuthState } from ".";
import { Status } from "..";
import { AuthMutationTypes } from "./mutation-types";
import { useCookies } from "vue3-cookies";
import { User } from "../user";

export const mutations: MutationTree<AuthState> = {
  [AuthMutationTypes.setLoggingInState]: (
    state,
    { isLoggingIn, status }: { isLoggingIn: boolean; status: Status }
  ) => {
    state.isLoggingIn = isLoggingIn;
    state.status = status;
  },
  [AuthMutationTypes.setLoggingOutState]: (
    state,
    { loggingOut, status }: { loggingOut: boolean; status: Status }
  ) => {
    state.isLoggingIn = loggingOut;
    state.loggingOutStatus = status;
  },
  [AuthMutationTypes.setAuthUser]: (state, authUser: User) => {
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
};
