import { Action, createStore, GetterTree, ModuleTree, Mutation } from "vuex";
import { app, AppState } from "./app";
import { AuthState, auth } from "./auth";
import { UserState, user } from "./user";
import { PostsState, posts } from "./posts";
import { CategoriesState, categories } from "./categories";
export const store = createStore({
  state: {
    isLoading: true,
  },
  mutations: {
    setLoading: (state, isLoading: boolean) => {
      state.isLoading = isLoading;
    },
  },
  modules: {
    app,
    auth,
    user,
    posts,
    categories,
  },
});

export interface RootState {
  isLoading: boolean;
  app?: AppState;
  auth?: AuthState;
  user?: UserState;
  posts?: PostsState;
  categories?: CategoriesState;
}

export enum Status {
  success = "success",
  failed = "failed",
}

export type FormType = "CREATE" | "EDIT";
export type StatusType = "SUCCESS" | "FAILED" | null;

export type SmartActionTree<S, R, T extends string> = {
  [P in T]: Action<S, R>;
};

export type SmartMutationTree<S, T extends string> = {
  [P in T]: Mutation<S>;
};

export interface SmartModule<
  S,
  R,
  A extends string = any,
  M extends string = any
> {
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  actions?: SmartActionTree<S, R, A>;
  mutations?: SmartMutationTree<S, M>;
  modules?: ModuleTree<R>;
}
