import { Module } from "vuex";
import { RootState } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { User } from "../user";

export interface UsersState {
  loading: boolean;
  users: User[];
};

const state: UsersState = {
  loading: false,
  users: [],
};

export const users: Module<UsersState, RootState> = {
  namespaced: true,
  state,
  actions: actions,
  mutations: mutations,
};
