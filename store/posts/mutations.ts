import { MutationTree } from "vuex";
import { PostsState } from ".";

export enum PostsMutationTypes {
  fetchPosts = "fetchPosts",
  fetchSuggestionsPosts = "fetchSuggestionsPosts",
  createPost = "createPost",
}

export const mutations: MutationTree<PostsState> = {
  [PostsMutationTypes.fetchPosts]: (
    state,
    payload: { loading: boolean; posts:any }
  ) => {
    state.loading = payload.loading;
    state.posts = payload.posts;
  },

  [PostsMutationTypes.fetchSuggestionsPosts]: (
    state,
    payload: { loading: boolean; posts:any }
  ) => {
    state.loading = payload.loading;
    state.suggestionPosts = payload.posts;
  },
};
