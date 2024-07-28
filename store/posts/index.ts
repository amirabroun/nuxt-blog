import { Module } from "vuex";
import { RootState } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { User } from "../user";

const state: PostsState = {
  loading: false,
  posts: [],
  suggestionPosts: [],
};

export const posts: Module<PostsState, RootState> = {
  namespaced: true,
  state,
  actions: actions,
  mutations: mutations,
};

export interface PostsState {
  loading: boolean;
  posts: Post[];
  suggestionPosts: Post[];
}

export interface Post {
  uuid: string;
  id?: number;
  user?: User;
  title?: string;
  image?: string;
  body?: string;
  likes_count: number;
  media?: Media[];
  created_at?: Date;
}

export interface Media {
  original_url: string;
}
