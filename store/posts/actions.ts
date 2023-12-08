import { ActionTree } from "vuex";
import { PostsState } from ".";
import { RootState, store } from "..";
import { PostsActionTypes } from "./action-types";
import { PostsMutationTypes } from "./mutation-types";
import { showToastErrorMessage, showToastSuccessMessage } from "../app/mutations";

export const actions: ActionTree<PostsState, RootState> = {
  [PostsActionTypes.fetchPosts]: ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`posts`, {
      method: "GET",
    }).then((res: any) => {
      commit(PostsMutationTypes.fetchPosts, {
        loading: false,
        posts: res.data.posts,
      });
    });
  },
  [PostsActionTypes.createPost]: ({ commit }, payload: any) => {
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`posts`, {
      method: "POST",
      data: payload
    }).then((res: any) => {
      commit(PostsMutationTypes.fetchPosts, {
        loading: false,
        posts: res.data.posts,
      });

      showToastSuccessMessage(store.commit, res.data.message);
    }).catch((error: any) => {
      showToastErrorMessage(store.commit, error.data.message);
    });
  },
};