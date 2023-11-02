import { ActionTree } from "vuex";
import { PostsState } from ".";
import { RootState, Status, store } from "..";
import { PostsActionTypes } from "./action-types";
import { PostsMutationTypes } from "./mutation-types";

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
      body: payload,
      'Content-Type': 'multipart/form-data'
    }).then((res: any) => {
      console.log(res);
    });
  },
};
