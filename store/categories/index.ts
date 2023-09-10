import { Module } from "vuex";
import { RootState } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";

const state: CategoriesState = {
  loading: false,
  categories: [],
};

export const categories: Module<CategoriesState, RootState> = {
  namespaced: true,
  state,
  actions: actions,
  mutations: mutations,
};

export interface CategoriesState {
  loading: boolean;
  categories: Category[];
}

export interface Category {
  id: number;
  uuid: string;
  title: string;
};