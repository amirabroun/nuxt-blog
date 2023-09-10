import { ActionTree } from "vuex";
import { CategoriesState } from ".";
import { RootState } from "..";
import { CategoriesActionTypes } from "./action-types";
import { CategoriesMutationTypes } from "./mutation-types";

export const actions: ActionTree<CategoriesState, RootState> = {
  [CategoriesActionTypes.fetchCategories]: ({ commit }) => {
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`categories`, {
      method: "GET",
    }).then((res: any) => {
      commit(CategoriesMutationTypes.fetchCategories, {
        loading: false,
        categories: res.data.categories,
      });
    });
  },
};
