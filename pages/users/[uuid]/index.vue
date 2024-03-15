<template>
  <VContainer fluid>
    <VRow justify="center">
      <v-col lg="1" class="d-none d-lg-flex"></v-col>
      <v-col lg="6" md="6">
        <v-tabs v-model="tab" bg-color="primary" class="rounded-lg mb-2">
          <v-tab value="posts">posts</v-tab>
          <v-tab value="followers"
            >followers ({{ user?.followers_count }})</v-tab
          >
          <v-tab value="followings"
            >followings ({{ user?.followings_count }})</v-tab
          >
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="posts">
            <div v-if="posts?.length">
              <post-card :posts="posts" :user="user"></post-card>
            </div>
            <div v-else>
              <v-card>
                <v-alert
                  type="info"
                  text="This user has no posts!"
                  variant="text"
                />
              </v-card>
            </div>
          </v-window-item>

          <v-window-item value="followers">
            <div v-if="user?.followers?.length">
              <VList
                v-for="follower in user?.followers"
                :key="follower.uuid"
                class="rounded-lg px-4 mb-2"
              >
                <VAvatar
                  size="50 "
                  class="ml-1 mr-3"
                  style="border-radius: 10px"
                >
                  <img
                    v-if="follower.avatar != null"
                    :src="follower.avatar"
                    class="avatar-img"
                  />
                  <img
                    v-else
                    src="@/assets/images/avatar.png"
                    class="avatar-img"
                  />
                </VAvatar>
                {{ follower.full_name }}
                <VBtn
                  width="80px"
                  height="25px"
                  v-if="authUser && authUser.uuid != follower?.uuid"
                  @click="toggleFollow(follower?.uuid)"
                  class="ml-4 rounded-lg"
                  :color="
                    follower?.auth_followed_at == null ? 'success' : 'danger'
                  "
                  style="font-size: 0.62rem"
                >
                  {{
                    follower?.auth_followed_at == null ? "follow" : "unfollow"
                  }}
                </VBtn>
              </VList>
            </div>
            <div v-else>
              <v-card>
                <v-alert
                  type="info"
                  text="This user has no followers!"
                  variant="text"
                />
              </v-card>
            </div>
          </v-window-item>

          <v-window-item value="followings">
            <div v-if="user?.followings?.length">
              <VList
                v-for="following in user?.followings"
                :key="following.uuid"
                class="rounded-lg px-4 mb-2"
              >
                <VAvatar
                  size="50 "
                  class="ml-1 mr-3"
                  style="border-radius: 10px"
                >
                  <img
                    v-if="following.avatar != null"
                    :src="following.avatar"
                    class="avatar-img"
                  />
                  <img
                    v-else
                    src="@/assets/images/avatar.png"
                    class="avatar-img"
                  />
                </VAvatar>
                {{ following.full_name }}
                <VBtn
                  width="80px"
                  height="25px"
                  v-if="authUser && authUser.uuid != following?.uuid"
                  @click="toggleFollow(following?.uuid)"
                  class="ml-4 rounded-lg"
                  :color="
                    following?.auth_followed_at == null ? 'success' : 'danger'
                  "
                  style="font-size: 0.62rem"
                >
                  {{
                    following?.auth_followed_at == null ? "follow" : "unfollow"
                  }}
                </VBtn>
              </VList>
            </div>
            <div v-else>
              <v-card>
                <v-alert
                  type="info"
                  text="This user has no followings!"
                  variant="text"
                />
              </v-card>
            </div>
          </v-window-item>
        </v-window>
      </v-col>
      <v-col lg="4" md="6" sm="12">
        <VCard class="pa-3 user-info w-100">
          <VRow>
            <v-col cols="3" lg="3" md="3">
              <img
                :src="user?.avatar"
                v-if="user?.avatar"
                width="100"
                class="rounded-xl"
              />
              <img
                src="@/assets/images/avatar.png"
                v-else
                width="100"
                class="rounded-xl"
              />
            </v-col>
            <v-col cols="9" lg="9" md="9" class="mt-3">
              {{ user?.full_name }}
              <VBtn
                width="80px"
                height="25px"
                v-if="authUser && authUser.uuid != user?.uuid"
                @click="toggleFollow(user?.uuid)"
                style="font-size: 0.62rem"
                class="ml-3 rounded-lg"
                :color="user?.auth_followed_at == null ? 'success' : 'danger'"
              >
                {{ user?.auth_followed_at == null ? "follow" : "unfollow" }}
              </VBtn>
              <NuxtLink
                width="80px"
                height="25px"
                v-if="authUser && authUser.uuid == user?.uuid"
                :to="`/users/${user.uuid}/edit`"
                class="edit-link"
              >
                Edit
              </NuxtLink>
              <div class="mt-3" style="font-size: 20px">
                {{ user?.username }}
              </div>
            </v-col>
          </VRow>
        </VCard>
      </v-col>
      <v-col lg="1" class="d-none d-lg-flex"></v-col>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { UserActionTypes } from "~/store/user/actions";
import { UsersActionTypes } from "~/store/users/actions";

const route = useRoute();
const tab: Ref<number> = ref(0);

onMounted(() => {
  store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
});

async function toggleFollow(uuid: any) {
  await store.dispatch(`users/${UsersActionTypes.userToggleFollow}`, uuid);

  await store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
}

const user = computed(() => store.state.user?.user);

const posts = computed(() => store.state.user?.user?.posts);
const authUser = computed(() => store.state.auth?.authUser);
</script>
<style scoped>
.btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.3rem;
}

.user-info {
  height: max-content;
}

.avatar-img {
  cursor: pointer;
  width: 100%;
}

.v-tab {
  text-transform: none !important;
}

.edit-link {
  background-color: #0c356a;
  color: #fff;
  font-size: 0.9rem;
  padding: 5px 15px;
  border-radius: 10px;
  margin-left: 10px;
}
</style>
