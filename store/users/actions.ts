import { ActionTree } from "vuex";
import { UsersState } from ".";
import { RootState } from "..";
import { UserMutationTypes } from "./mutations";

export enum UsersActionTypes {
  fetchUsers = "fetchUsers",
  fetchSuggestionsUsers = "fetchSuggestionsUsers",
  userToggleFollow = "userToggleFollow",
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
  [UsersActionTypes.fetchSuggestionsUsers]: async ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    await $httpsRequest(`suggestions/users`, {
      method: "GET",
    }).then((res: any) => {
      commit(UserMutationTypes.fetchSuggestionsUsers, {
        loading: false,
        users: res.data.users,
      });
    });
  },
  [UsersActionTypes.userToggleFollow]: async ({ commit }, uuid) => {
    const { $httpsRequest } = useNuxtApp();

    await $httpsRequest(`users/${uuid}/toggle-follow`, {
      method: "PUT",
    }).then(() => {
      commit(UserMutationTypes.fetchSuggestionsUsers, {
        loading: false,
      });
    });
  },
};
