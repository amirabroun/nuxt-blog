<template>
  <v-row justify="space-around" class="mt-10">
    <v-col v-if="authUser" md="2" class="d-none d-md-block">
      <index-quick-access />
    </v-col>

    <v-col md="5" lg="6">
      <post-card v-if="posts?.length" />
      <v-alert
        v-else
        type="info"
        title="Pay Attention"
        text="You have no following!"
        variant="tonal"
      />
    </v-col>

    <v-col lg="4" md="4" v-if="authUser" class="d-none d-md-block">
      <v-card position="fixed" style="background: none" variant="flat">
        <v-list density="compact" style="background: none">
          <v-list-subheader color="light"> Suggestion Users </v-list-subheader>
          <v-list-item v-for="user in suggestionUsers" :key="user.id">
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

let suggestionUsers = ref();
const authUser = computed(() => store.state.auth?.authUser);
const posts = computed(() => store.state.posts?.posts);

if (authUser.value) {
  onMounted(async () => {
    await store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
    await store.dispatch(`users/${UsersActionTypes.fetchSuggestionsUsers}`);
    suggestionUsers.value = store.state.users?.suggestionUsers;
  });
}

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