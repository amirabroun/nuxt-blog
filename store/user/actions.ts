import { ActionTree } from "vuex";
import { UserState } from ".";
import { RootState, Status } from "..";
import { UserMutationTypes } from "./mutations";
import { store } from "~/store";
import {
  showToastErrorMessage,
  showToastSuccessMessage,
} from "../app/mutations";

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
  fetchUser: async ({ commit }, uuid: string) => {
    commit(UserMutationTypes.fetchUser, {
      loading: true,
      user: null,
    });
    const { $httpsRequest } = useNuxtApp();
    await $httpsRequest(`users/${uuid}`, {
      method: "POST",
    }).then((res: any) => {
      commit(UserMutationTypes.fetchUser, {
        loading: false,
        user: res.data.user,
      });
    });
  },
  updateUserResume: ({ commit }, payload: UserResume) => {
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

  fetchNotifications: async ({ commit }, userUuid: string) => {
    const { $httpsRequest } = useNuxtApp();

    await $httpsRequest(`users/${userUuid}/notifications`, {
      method: "GET",
    }).then((res: any) => {
      commit('fetchNotifications', res);
    });
  },
};

export const updateUserProfile = async (
  uuid: any,
  firstName: string,
  lastName: string,
  username: string
) => {
  const { $httpsRequest } = useNuxtApp();

  await $httpsRequest(`users/${uuid}/update-profile`, {
    method: "PUT",
    data: {
      first_name: firstName,
      last_name: lastName,
      username: username,
    },
  }).then((res: any) => {
    showToastSuccessMessage(store.commit, res.message);
  });
};

export const checkUniqueUsername = async (
  uuid: any,
  username: string | any
) => {
  const { $httpsRequest } = useNuxtApp();

  await $httpsRequest(`users/${uuid}/username/check`, {
    method: "POST",
    data: {
      username: username,
    },
  })
    .then((res: any) => {
      showToastSuccessMessage(store.commit, res.message);
    })
    .catch((res: any) => {
      showToastErrorMessage(store.commit, res.data.message);
    });
};

export const deleteUserAvatar = async (uuid: any) => {
  const { $httpsRequest } = useNuxtApp();

  await $httpsRequest(`users/${uuid}/avatar`, {
    method: "DELETE",
  }).then((res: any) => {
    showToastSuccessMessage(store.commit, res.message);
  });
};

export const addUserAvatar = async (uuid: any, payload: any) => {
  const { $httpsRequest } = useNuxtApp();

  await $httpsRequest(`users/${uuid}/avatar`, {
    method: "POST",
    data: payload,
  }).then((res: any) => {
    showToastSuccessMessage(store.commit, res.message);
  });
};
