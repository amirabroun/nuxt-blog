import { MutationTree } from "vuex";
import { UserInfo, UserState } from ".";
import { UserMutationTypes } from "./mutation-types";

export const mutations: MutationTree<UserState> = {
  [UserMutationTypes.fetchUser]: (
    state,
    payload: { loading: boolean; user: UserInfo }
  ) => {
    state.loading = payload.loading;
    state.user_info = payload.user;
  },
};
