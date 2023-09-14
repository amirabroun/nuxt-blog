import { MutationTree } from "vuex";
import { User, UserState } from ".";
import { UserMutationTypes } from "./mutation-types";
import { Status } from "..";

export const mutations: MutationTree<UserState> = {
  [UserMutationTypes.fetchUser]: (
    state,
    payload: { loading: boolean; user: User; savedData: User }
  ) => {
    state.loading = payload.loading;
    state.user = payload.user;
    state.savedUser = payload.savedData;
  },
  [UserMutationTypes.updateResumeStatus]: (
    state,
    payload: { loading: boolean; status: Status }
  ) => {
    state.loading = payload.loading;
    state.updateResumeStatus = payload.status;
  },
  [UserMutationTypes.fetchUserPosts]: (
    state,
    payload: { loading: boolean; user: User; savedData: User; posts: [] }
  ) => {
    state.loading = payload.loading;
    state.user = payload.user;
    state.user.posts = payload.posts;
    state.savedUser = payload.savedData;
  },
};
