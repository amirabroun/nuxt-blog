import { Module } from "vuex";
import { store, RootState, Status } from "..";
import { UserMutationTypes, mutations } from "./mutations";
import { actions } from "./actions";
import { Post } from "../posts";

export interface User {
  id?: number;
  uuid: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  username?: string;
  avatar?: string;
  is_admin?: boolean;
  created_at?: Date;
  updated_at?: Date;
  followers_count?: number;
  followings_count?: number;
  auth_followed_at?: Date;
  follow_accepted_at?: Date;
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
  posts?: Post[];
  followings?: User[];
  followers?: User[];
}

export interface Notification {
  id?: string;
  text?: string;
  created_at: Date;
}

export interface UserState {
  loading: boolean;
  user: User;
  savedUser: User;
  notifications: Notification[];
  updateResumeStatus: Status | null;
}

const state: UserState = {
  loading: false,
  user: {
    uuid: '',
    full_name: '',
    username: '',
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
    posts: [],
  },
  savedUser: {
    uuid: '',
  },
  notifications: [],
  updateResumeStatus: null,
};

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  actions: actions,
  mutations: mutations,
};

export const userCommit = <T = any>(
  mutation: keyof typeof UserMutationTypes,
  payload?: T
) => {
  store.commit(`user/${mutation}`, payload);
};
