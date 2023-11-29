import { Module } from "vuex";
import { RootState } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { User } from "../user";

const state: PostsState = {
  loading: false,
  posts: [],
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
}

export interface Post {
  id?: number;
  user: User;
  title?: string;
  image?: string;
  body?: string;
  created_at?: Date;
}