import { ActionTree } from "vuex";
import { UsersState } from ".";
import { RootState } from "..";
import { UsersActionTypes } from "./action-types";
import { UserMutationTypes } from "./mutation-types";

export const actions: ActionTree<UsersState, RootState> = {
  [UsersActionTypes.fetchUsers]: ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`users`, {
      method: "GET",
    }).then((res: any) => {
      commit(UserMutationTypes.fetchUsers, {
        loading: false,
        users: res.data.users,
      });
    });
  },
};
