import { MutationTree } from "vuex";
import { PostsState } from ".";
import { PostsMutationTypes } from "./mutation-types";

export const mutations: MutationTree<PostsState> = {
  [PostsMutationTypes.fetchPosts]: (
    state,
    payload: { loading: boolean; posts:any }
  ) => {
    state.loading = payload.loading;
    state.posts = payload.posts;
  },
};
