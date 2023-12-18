import { ActionTree } from "vuex";
import { UsersState } from ".";
import { RootState } from "..";
import { UserMutationTypes } from "./mutations";

export enum UsersActionTypes {
  fetchUsers = "fetchUsers",
  fetchSuggestionsUsers = "fetchSuggestionsUsers",
}

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
  [UsersActionTypes.fetchSuggestionsUsers]: ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`suggestions/users`, {
      method: "GET",
    }).then((res: any) => {
      commit(UserMutationTypes.fetchSuggestionsUsers, {
        loading: false,
        users: res.data.users,
      });
    });
  },
};
