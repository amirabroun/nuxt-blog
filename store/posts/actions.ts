import { ActionTree } from "vuex";
import { PostsState } from ".";
import { RootState, store } from "..";
import {
  showToastErrorMessage,
  showToastSuccessMessage,
} from "../app/mutations";
import { PostsMutationTypes } from "./mutations";

export enum PostsActionTypes {
  fetchPosts = "fetchPosts",
  fetchSuggestionsPosts = "fetchSuggestionsPosts",
  createPost = "createPost",
}

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
  [PostsActionTypes.fetchSuggestionsPosts]: async ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    await $httpsRequest(`suggestions/posts`, {
      method: "GET",
    }).then((res: any) => {
      commit(PostsMutationTypes.fetchSuggestionsPosts, {
        loading: false,
        posts: res.data.posts,
      });
    });
  },
  [PostsActionTypes.createPost]: ({ commit }, payload: any) => {
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`posts`, {
      method: "POST",
      data: payload,
    })
      .then((res: any) => {
        commit(PostsMutationTypes.fetchPosts, {
          loading: false,
          posts: res.data.posts,
        });

        showToastSuccessMessage(store.commit, res.message);
      })
      .catch((error: any) => {
        showToastErrorMessage(store.commit, error.message);
      });
  },
};
