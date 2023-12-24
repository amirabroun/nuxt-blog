import { MutationTree } from "vuex";
import { UsersState } from ".";

export enum UserMutationTypes {
  fetchUsers = "fetchUsers",
  fetchSuggestionsUsers = "fetchSuggestionsUsers",
  userToggleFollow = "userToggleFollow",
}

export const mutations: MutationTree<UsersState> = {
  [UserMutationTypes.fetchUsers]: (
    state,
    payload: { loading: boolean; users: [] }
  ) => {
    state.loading = payload.loading;
    state.users = payload.users;
  },
  [UserMutationTypes.fetchSuggestionsUsers]: (
    state,
    payload: { loading: boolean; users: [] }
  ) => {
    state.loading = payload.loading;
    state.suggestionUsers = payload.users;
  },
  [UserMutationTypes.userToggleFollow]: (
    state,
    payload: { loading: boolean; }
  ) => {
    state.loading = payload.loading;
  },
};
