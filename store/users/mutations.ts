import { MutationTree } from "vuex";
import { UsersState } from ".";

export enum UserMutationTypes {
  fetchUsers = "fetchUsers",
  fetchSuggestionsUsers = "fetchSuggestionsUsers",
}

export const mutations: MutationTree<UsersState> = {
  [UserMutationTypes.fetchUsers]: (
    state,
    payload: { loading: boolean; users:[] }
  ) => {
    state.loading = payload.loading;
    state.users = payload.users;
  },
  [UserMutationTypes.fetchSuggestionsUsers]: (
    state,
    payload: { loading: boolean; users:[] }
  ) => {
    state.loading = payload.loading;
    state.suggestionUsers = payload.users;
  },
};
