<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-tabs
          v-if="authUser"
          v-model="tab"
          bg-color="primary"
          class="rounded-t-lg mb-1"
        >
          <v-tab value="followings" text="Your followings" />
          <v-tab
            value="suggestion"
            @click.once="fetchSuggestion"
            text="Suggestion for you"
          />
        </v-tabs>

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
            <post-card
              v-if="suggestionPosts?.length"
              :posts="suggestionPosts"
            />
            <v-alert
              v-else
              type="info"
              text="there is no post to show you!"
              variant="tonal"
            />
          </v-window-item>
        </v-window>
      </v-col>
      <v-col v-if="authUser" cols="4">
        <v-card style="height: max-content">
          <v-list density="compact">
            <v-list-subheader color="primary">
              Suggestion Users
            </v-list-subheader>
            <v-divider class="my-3" />
            <v-list-item v-for="(user, index) in suggestionUsers" :key="index">
              <v-avatar size="50" rounded="lg">
                <img :src="user?.avatar" v-if="user?.avatar" class="w-100" />
                <img src="@/assets/images/avatar.png" v-else class="w-100" />
              </v-avatar>
              <nuxt-link class="text-info ml-3" :to="`/users/${user.uuid}`">
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
  </v-container>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { PostsActionTypes } from "~/store/posts/actions";
import { UsersActionTypes } from "~/store/users/actions";

let tab = ref(0);

if (tab.value === 0) {
  fetchSuggestion();
}

const posts = computed(() => store.state.posts?.posts);
let suggestionUsers = ref();

const authUser = computed(() => store.state.auth?.authUser);

const suggestionPosts = computed(() => store.state.posts?.suggestionPosts);

async function fetchSuggestion() {
  await store.dispatch(`posts/${PostsActionTypes.fetchSuggestionsPosts}`);
}

onMounted(async () => {
  if (authUser.value) {
    await store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
    await store.dispatch(`users/${UsersActionTypes.fetchSuggestionsUsers}`);
    suggestionUsers.value = store.state.users?.suggestionUsers;
  }
});

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

<style scoped>
.v-tab {
  text-transform: none !important;
}
</style>
