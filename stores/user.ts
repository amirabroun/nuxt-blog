import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state() {
    return {
      loading: false,
      user: {
        uuid: "",
        full_name: "",
        username: "",
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
        uuid: "",
      },
      updateResumeStatus: null,
    } as any;
  },
  getters: {
    getUser(): any {
      return this.user;
    },
    getUserPosts(): object[] {
      return this.user.posts;
    },
    getUserUUID(): string {
      return this.user.uuid;
    },
  },
  actions: {
    async fetchUserData(uuid: string) {
      const { $httpsRequest } = useNuxtApp();
      await $httpsRequest(`users/${uuid}/posts`, {
        method: "GET",
      }).then((res: any) => {
        this.user = res.data.user;
        this.user.posts = res.data.posts;
      });
    },
    async fetchUserPosts(uuid: string) {
      const { $httpsRequest } = useNuxtApp();
      await $httpsRequest(`users/${uuid}/posts`, {
        method: "GET",
      }).then((res: any) => {
        this.loading = res.data.loading;
        this.user = res.data.user;
        this.user.posts = res.data.posts;
        this.savedUser = res.data.savedData;
      });
    },
    async toggleFollow(uuid: string) {
      const { $httpsRequest } = useNuxtApp();
      await $httpsRequest(`users/${uuid}/toggle-follow`, {
        method: "PUT",
      });
    },
  },
});
