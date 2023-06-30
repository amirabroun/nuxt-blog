import { MutationTree } from "vuex";
import { UserInfo, UserState } from ".";
import { UserMutationTypes } from "./mutation-types";
import { Status } from "..";

export const mutations: MutationTree<UserState> = {
  [UserMutationTypes.fetchUser]: (
    state,
    payload: { loading: boolean; user: UserInfo; savedData: UserInfo }
  ) => {
    state.loading = payload.loading;
    state.user_info = payload.user;
    state.savedUserInfo = payload.savedData;
  },
  [UserMutationTypes.updateResumeStatus]: (
    state,
    payload: { loading: boolean; status: Status }
  ) => {
    state.loading = payload.loading;
    state.updateResumeStatus = payload.status;
  },
};
