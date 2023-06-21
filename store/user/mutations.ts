import { MutationTree } from "vuex";
import { UserInfo, UserState } from ".";
import { UserMutationTypes } from "./mutation-types";
import { Status } from "..";

export const mutations: MutationTree<UserState> = {
  [UserMutationTypes.fetchUser]: (
    state,
    payload: { loading: boolean; user: UserInfo }
  ) => {
    state.loading = payload.loading;
    state.user_info = payload.user;
  },
  [UserMutationTypes.updateResumeStatus]: (
    state,
    payload: { loading: boolean; status: Status }
  ) => {
    state.loading = payload.loading;
    state.updateResumeStatus = payload.status;
  },
};
