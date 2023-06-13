import { ActionTree } from "vuex";
import { UserState } from ".";
import { RootState, Status } from "..";
import { UserActionTypes } from "./action-types";
import { UserMutationTypes } from "./mutation-types";
export const actions: ActionTree<UserState, RootState> = {
  [UserActionTypes.fetchUser]: ({ commit }, uuid: string) => {
    commit(UserMutationTypes.fetchUser, {
      loading: true,
      user: null,
    });
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`users/${uuid}`, {
      method: "GET",
    }).then((res: any) => {
      commit(UserMutationTypes.fetchUser, {
        loading: false,
        user: res.data,
      });
    });
  },
};
