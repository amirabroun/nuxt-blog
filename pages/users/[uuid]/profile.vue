<template>
  <v-row justify="space-between" class="mt-10">
    <v-col v-if="authUser" md="2" class="d-none d-lg-block">
      <v-card variant="text" width="250" position="fixed">
        <v-card-text>
          <h4 class="mb-3">Quick access</h4>
          <v-divider length="100" class="mb-3" />
          <v-timeline
            truncate-line="both"
            align="start"
            density="compact"
            line-inset="4"
          >
            <v-timeline-item
              icon="mdi-home-outline"
              style="cursor: pointer"
              dot-color="light"
              rounded="lg"
              @click="
                () => {
                  tab = 0;
                }
              "
              elevation="3"
              size="small"
            >
              <nuxt-link class="text-black" to="/"> Home </nuxt-link>
            </v-timeline-item>

            <v-timeline-item
              icon="mdi-alarm-light"
              elevation="3"
              style="cursor: pointer"
              rounded="lg"
              dot-color="light"
              size="small"
            >
              Notifications
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col
      order-md="last"
      order-lg="last"
      lg="4"
      md="5"
      sm="12"
      class="mb-sm-2"
    >
      <v-card class="pa-3 user-info w-100">
        <v-row>
          <v-col cols="3" lg="3" md="3">
            <img
              :src="user?.avatar"
              v-if="user?.avatar"
              width="100"
              class="rounded-lg w-100"
            />
            <img
              src="@/assets/images/avatar.png"
              v-else
              width="100"
              class="rounded-lg w-100"
            />
          </v-col>

          <v-col cols="9" lg="9" md="9" class="mt-3">
            {{ user?.full_name }}
            <v-btn
              width="80px"
              height="25px"
              v-if="authUser && authUser.uuid != user?.uuid"
              @click="toggleFollow(user?.uuid)"
              style="font-size: 0.62rem"
              class="ml-3 rounded-lg"
              :color="user?.auth_followed_at == null ? 'success' : 'danger'"
            >
              {{ user?.auth_followed_at == null ? "follow" : "unfollow" }}
            </v-btn>
            <nuxt-link
              width="80px"
              height="25px"
              v-if="authUser && authUser.uuid == user?.uuid"
              :to="`/users/${user.uuid}/edit`"
              class="edit-link"
            >
              Edit
            </nuxt-link>
            <div class="mt-3" style="font-size: 20px">
              {{ user?.username }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col lg="6" md="7" sm="12">
      <v-tabs v-model="tab" bg-color="primary" class="rounded-lg mb-2">
        <v-tab value="posts">posts</v-tab>
        <v-tab value="followers">
          followers ({{ user?.followers_count }})
        </v-tab>
        <v-tab value="followings">
          followings ({{ user?.followings_count }})
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="posts">
          <div v-if="posts?.length">
            <v-card
              class="relative pa-3 py-1 mb-3"
              v-for="post in posts"
              :key="post.title"
              rounded="sm"
            >
              <div v-if="authUser" class="pa-2 text-right">
                <v-btn-group density="compact">
                  <post-delete-btn
                    v-if="user?.uuid === authUser?.uuid"
                    :post="post"
                  />
                  <post-edit-btn
                    v-if="user?.uuid === authUser?.uuid"
                    :post="post"
                  />

                  <v-btn
                    @click="toggleLike(post)"
                    prepend-icon="mdi-heart-outline"
                    size="small"
                  >
                    <span class="py-auto">
                      {{ post.likes_count }}
                    </span>
                  </v-btn>
                </v-btn-group>
                <v-divider class="my-3" />
              </div>

              <v-img
                :src="post.media?.find(() => true)?.original_url"
                class="rounded-lg mt-4"
              />
              <v-card-title class="text-h5">{{ post.title }}</v-card-title>
              <v-cardText>{{ post.body }}</v-cardText>
              <v-cardSubtitle class="mb-3">
                by
                <NuxtLink
                  class="text-info ml-1"
                  :to="`/users/${user?.uuid ?? post.user?.uuid}/profile`"
                >
                  {{ user?.full_name ?? post.user?.full_name }}
                </NuxtLink>
                at
                <span class="text-dark ml-1">{{ post.created_at }}</span>
              </v-cardSubtitle>
            </v-card>
          </div>
          <v-alert
            v-else
            type="info"
            text="This user has no posts!"
            variant="text"
          />
        </v-window-item>

        <v-window-item value="followers">
          <div v-if="user?.followers?.length">
            <v-list
              v-for="follower in user?.followers"
              :key="follower.uuid"
              class="rounded-lg px-4 mb-2"
            >
              <v-avatar
                size="50 "
                class="ml-1 mr-3"
                style="border-radius: 10px"
              >
                <img
                  v-if="follower.avatar != null"
                  :src="follower.avatar"
                  class="w-100"
                />
                <img v-else src="@/assets/images/avatar.png" class="w-100" />
              </v-avatar>
              {{ follower.full_name }}
              <v-btn
                width="80px"
                height="25px"
                v-if="authUser && authUser.uuid != follower?.uuid"
                @click="toggleFollow(follower?.uuid)"
                class="ml-4 rounded-lg"
                :color="
                  follower?.auth_followed_at == null ? 'success' : 'danger'
                "
                style="font-size: 0.52rem"
              >
                {{
                  follower?.auth_followed_at == null
                    ? "follow back"
                    : "unfollow"
                }}
              </v-btn>
            </v-list>
          </div>
          <v-alert
            v-else
            type="info"
            text="This user has no followers!"
            variant="text"
          />
        </v-window-item>

        <v-window-item value="followings">
          <div v-if="user?.followings?.length">
            <v-list
              v-for="following in user?.followings"
              :key="following.uuid"
              class="rounded-lg px-4 mb-2"
            >
              <v-avatar
                size="50 "
                class="ml-1 mr-3"
                style="border-radius: 10px"
              >
                <img
                  v-if="following.avatar != null"
                  :src="following.avatar"
                  class="w-100"
                />
                <img v-else src="@/assets/images/avatar.png" class="w-100" />
              </v-avatar>
              {{ following.full_name }}
              <v-btn
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
              </v-btn>
            </v-list>
          </div>
          <v-alert
            v-else
            type="info"
            text="This user has no followings!"
            variant="text"
          />
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { UserActionTypes } from "~/store/user/actions";
import { UsersActionTypes } from "~/store/users/actions";
import { toggleLikePost } from "~/store/posts/actions";
import { Post } from "~/store/posts";

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

async function toggleLike(post: Post) {
  await toggleLikePost(post.uuid).then(() => {
    const route = useRoute();
    store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
  });
}
</script>
<style scoped>
.v-tab {
  text-transform: none !important;
}
</style>
