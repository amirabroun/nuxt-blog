import { Module } from "vuex";
import { RootState } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { User } from "../user";

export interface UsersState {
  loading: boolean;
  users: User[];
  suggestionUsers: User[];
};

const state: UsersState = {
  loading: false,
  users: [],
  suggestionUsers: [],
};

export const users: Module<UsersState, RootState> = {
  namespaced: true,
  state,
  actions: actions,
  mutations: mutations,
};
