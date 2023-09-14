import { MutationTree } from "vuex";
import { UsersState } from ".";
import { UserMutationTypes } from "./mutation-types";

export const mutations: MutationTree<UsersState> = {
  [UserMutationTypes.fetchUsers]: (
    state,
    payload: { loading: boolean; users:[] }
  ) => {
    state.loading = payload.loading;
    state.users = payload.users;
  },
};
