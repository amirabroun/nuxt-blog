import { Module } from "vuex";
import { store, RootState, Status } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { UserActionTypes } from "./action-types";
import { UserMutationTypes } from "./mutation-types";
export interface UserInfo {
  uuid?: string;
  full_name?: string;
  email?: string;
  avatar?: string;
  is_admin?: number;
  created_at?: string;
  updated_at?: string;
  resume?: {
    summary?: string;
    experiences?: {
      company?: string;
      position?: string;
      started_at?: string;
      finished_at?: string;
    }[];
    skills?: { title?: string; percent?: number }[];
    created_at?: string;
    updated_at?: string;
  };
  media?: [];
}

export interface UserState {
  loading: boolean;
  user_info: UserInfo;
}

const state: UserState = {
  loading: false,

  user_info: {
    uuid: undefined,
    full_name: undefined,
    email: undefined,
    avatar: undefined,
    is_admin: undefined,
    created_at: undefined,
    updated_at: undefined,
    resume: {
      summary: undefined,
      experiences: [],
      skills: [],
      created_at: undefined,
      updated_at: undefined,
    },
    media: [],
  },
};

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  actions: actions,
  mutations: mutations,
};

export const userDispatch = <T = any>(
  action: keyof typeof UserActionTypes,
  payload?: T
): Promise<any> => {
  return store.dispatch(`user/${action}`, payload);
};

export const userCommit = <T = any>(
  mutation: keyof typeof UserMutationTypes,
  payload?: T
) => {
  store.commit(`user/${mutation}`, payload);
};
