import { ActionTree } from "vuex";
import { UserState } from ".";
import { RootState, Status } from "..";
import { UserActionTypes } from "./action-types";
import { UserMutationTypes } from "./mutation-types";

export interface UserResume {
  uuid: string;
  summary: string;
  skills: {
    title: string;
    percent: number;
  }[];
  experiences: {
    company: string;
    position: string;
    description: string;
    started_at: string;
  }[];
  education:
    | {
        field?: string;
        university?: string;
        started_at?: string;
        finished_at?: string;
        location?: string;
      }[]
    | undefined;
  contact: {
    title: string;
    link: string;
  }[];
}

export const actions: ActionTree<UserState, RootState> = {
  [UserActionTypes.fetchUser]: ({ commit }, uuid: string) => {
    commit(UserMutationTypes.fetchUser, {
      loading: true,
      user: null,
    });
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`users/${uuid}`, {
      method: "GET",
    }).then((res: any) => {
      commit(UserMutationTypes.fetchUser, {
        loading: false,
        user: res.data,
      });
    });
  },
  [UserActionTypes.updateUserResume]: ({ commit }, payload: UserResume) => {
    commit(UserMutationTypes.updateResumeStatus, {
      loading: true,
      sttaus: null,
    });
    const uuid = payload.uuid;
    //@ts-ignore
    delete payload.uuid;
    const { $httpsRequest } = useNuxtApp();
    $httpsRequest(`users/${uuid}/update-resume`, {
      method: "PUT",
      body: payload,
    })
      .then((res: any) => {
        commit(UserMutationTypes.updateResumeStatus, {
          loading: false,
          status: Status.success,
        });
        commit(UserMutationTypes.fetchUser, {
          loading: false,
          user: res.data.user,
        });
      })
      .catch(() => {
        commit(UserMutationTypes.updateResumeStatus, {
          loading: false,
          status: Status.failed,
        });
      });
  },
};
