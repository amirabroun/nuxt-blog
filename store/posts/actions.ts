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
  [PostsActionTypes.fetchPosts]: async ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    await $httpsRequest(`posts`, {
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

export const deletePost = async (uuid: string) => {
  const { $httpsRequest } = useNuxtApp();

  await $httpsRequest(`posts/${uuid}`, {
    method: "DELETE",
  }).then((res: any) => {
    showToastSuccessMessage(store.commit, res.message);
  }).catch((error: any) => {
    showToastErrorMessage(store.commit, error.message);
  });
};

export const updatePost = async (uuid: string, payload: any) => {
  const { $httpsRequest } = useNuxtApp();

  return await $httpsRequest(`posts/${uuid}/update`, {
    method: "POST",
    data: payload,
  }).then((res: any) => {
    showToastSuccessMessage(store.commit, res.message);

    return res;
  }).catch((error: any) => {
    showToastErrorMessage(store.commit, error.message);

    return error;
  });
};

export const deletePostImage = async (uuid: string) => {
  const { $httpsRequest } = useNuxtApp();

  await $httpsRequest(`posts/${uuid}/image`, {
    method: "DELETE",
  }).then((res: any) => {
    showToastSuccessMessage(store.commit, res.message);
  }).catch((error: any) => {
    showToastErrorMessage(store.commit, error.message);
  });
};

export const toggleLikePost = async (uuid: string) => {
  const { $httpsRequest } = useNuxtApp();

  await $httpsRequest(`posts/${uuid}/toggle-like`, {
    method: "PUT",
  });
};