import { Module } from "vuex";
import { store, RootState, Status } from "..";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { UserActionTypes } from "./action-types";
import { UserMutationTypes } from "./mutation-types";
export interface UserInfo {
  uuid?: string;
  full_name?: string;
  username?: string;
  avatar?: string;
  is_admin?: number;
  created_at?: string;
  updated_at?: string;
  resume?: {
    contact?: { title?: string; link?: string }[];
    education?: {
      field?: string;
      finished_at?: string;
      location?: string;
      started_at?: string;
      university?: string;
    }[];
    summary?: string;
    experiences?: {
      company?: string;
      position?: string;
      started_at?: string;
      finished_at?: string;
      description?: string;
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
  updateResumeStatus: Status | null;
}

const state: UserState = {
  loading: false,
  user_info: {
    uuid: undefined,
    full_name: undefined,
    username: undefined,
    avatar: undefined,
    is_admin: undefined,
    created_at: undefined,
    updated_at: undefined,
    resume: {
      contact: [],
      education: [],
      summary: undefined,
      experiences: [],
      skills: [],
      created_at: undefined,
      updated_at: undefined,
    },
    media: [],
  },
  updateResumeStatus: null,
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
