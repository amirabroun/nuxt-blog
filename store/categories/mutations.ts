import { MutationTree } from "vuex";
import { CategoriesState } from ".";
import { CategoriesMutationTypes } from "./mutation-types";

export const mutations: MutationTree<CategoriesState> = {
  [CategoriesMutationTypes.fetchCategories]: (
    state,
    payload: { loading: boolean; categories:any }
  ) => {
    state.loading = payload.loading;
    state.categories = payload.categories;
  },
};
