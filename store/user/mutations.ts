import { MutationTree } from "vuex";
import { User, UserState } from ".";
import { Status } from "..";

export enum UserMutationTypes {
  fetchUser = "fetchUser",
  updateResumeStatus = "updateResumeStatus",
}

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
  fetchNotifications(state, payload) {
    state.notifications = payload.data.notifications;    
  }
};
