<template>
  <v-row justify="space-around" class="mt-10">
    <v-col v-if="authUser" md="2" class="d-none d-md-block">
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
              icon="mdi-account-outline"
              style="cursor: pointer"
              dot-color="light"
              rounded="lg"
              elevation="3"
              size="small"
            >
              <nuxt-link
                class="text-black"
                :to="`/users/${authUser?.uuid}/profile`"
              >
                Account
              </nuxt-link>
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
            <v-timeline-item
              style="cursor: pointer"
              rounded="lg"
              elevation="3"
              @click="
                () => {
                  tab = 0;
                }
              "
              v-if="tab !== 0"
              icon="mdi-tag-faces"
              dot-color="light"
              size="small"
            >
              Your followings
            </v-timeline-item>
            <v-timeline-item
              style="cursor: pointer"
              rounded="lg"
              elevation="3"
              @click="
                () => {
                  tab = 1;
                }
              "
              v-if="tab !== 1"
              icon="mdi-creation"
              dot-color="light"
              size="small"
            >
              Suggestion for you
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col md="5" lg="6">
      <v-window v-model="tab">
        <v-window-item value="followings" v-if="authUser">
          <post-card v-if="posts?.length" :posts="posts" />
          <v-alert
            v-else
            type="info"
            title="Pay Attention"
            text="You have no following!"
            variant="tonal"
          />
        </v-window-item>

        <v-window-item value="suggestion">
          <post-card v-if="suggestionPosts?.length" :posts="suggestionPosts" />
          <v-alert
            v-else
            type="info"
            text="there is no post to show you!"
            variant="tonal"
          />
        </v-window-item>
      </v-window>
    </v-col>

    <v-col lg="4" md="4" v-if="authUser" class="d-none d-md-block">
      <v-card position="fixed" style="background: none" variant="flat">
        <v-list density="compact" style="background: none">
          <v-list-subheader color="light"> Suggestion Users </v-list-subheader>
          <v-divider class="my-3" color="white" />
          <v-list-item v-for="(user, index) in suggestionUsers" :key="index">
            <v-avatar size="50" rounded="lg">
              <img :src="user?.avatar" v-if="user?.avatar" class="w-100" />
              <img src="@/assets/images/avatar.png" v-else class="w-100" />
            </v-avatar>
            <nuxt-link
              class="text-light ml-3"
              :to="`/users/${user.uuid}/profile`"
            >
              {{ user.username }}
            </nuxt-link>
            <v-btn
              width="80px"
              height="25px"
              @click="toggleFollow(user?.uuid)"
              class="ml-4 rounded-md"
              style="font-size: 0.6rem"
              text="follow"
            />
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { PostsActionTypes } from "~/store/posts/actions";
import { UsersActionTypes } from "~/store/users/actions";

let tab = ref(0);
if (tab.value === 0) {
  fetchSuggestion();
}

async function fetchSuggestion() {
  await store.dispatch(`posts/${PostsActionTypes.fetchSuggestionsPosts}`);
}

let suggestionUsers = ref();
const authUser = computed(() => store.state.auth?.authUser);
if (authUser.value) {
  onMounted(async () => {
    store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
    store.dispatch(`users/${UsersActionTypes.fetchSuggestionsUsers}`);
    suggestionUsers.value = store.state.users?.suggestionUsers;
  });
}

const suggestionPosts = computed(() => store.state.posts?.suggestionPosts);
const posts = computed(() => store.state.posts?.posts);

async function toggleFollow(uuid: string) {
  if (suggestionUsers.value?.length! > 1) {
    await store.dispatch(`users/${UsersActionTypes.userToggleFollow}`, uuid);
    suggestionUsers.value = suggestionUsers.value?.filter(
      (user: { uuid: string }) => user.uuid !== uuid
    );
  } else {
    await store.dispatch(`users/${UsersActionTypes.fetchSuggestionsUsers}`);
    suggestionUsers.value = store.state.users?.suggestionUsers;
  }
  store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
}
</script>