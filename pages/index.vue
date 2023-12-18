<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="8">
        <VCard v-for="post in posts" :key="post.id" class="mb-3 pa-2 rounded-lg" flat>
          <VImg :src="post.media?.find(() => true)?.original_url" max-height="400" class="rounded-lg"></VImg>
          <VCardTitle class="text-h5 my-4">
            {{ post.title }}
          </VCardTitle>
          <VCardText>
            <div>{{ post.body }}</div>
            <div class="text-grey mt-3">
              by <NuxtLink class="text-info" :to="`/users/${post.user.uuid}`">{{ post.user.full_name }}</NuxtLink>
              <span class="ml-1">at {{ post.created_at }}</span>
            </div>
          </VCardText>
        </VCard>
        <div class="separator mb-3">Suggestion for you</div>
        <VCard v-for="post in suggestionPosts" :key="post.id" class="mb-3 pa-2 rounded-lg" flat>
          <VImg :src="post.media?.find(() => true)?.original_url" max-height="400" class="rounded-lg"></VImg>
          <VCardTitle class="text-h5 my-4">
            {{ post.title }}
          </VCardTitle>
          <VCardText>
            <div>{{ post.body }}</div>
            <div class="text-grey mt-3">
              by <NuxtLink class="text-info" :to="`/users/${post.user.uuid}`">{{ post.user.full_name }}</NuxtLink>
              <span class="ml-1">at {{ post.created_at }}</span>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4" class="d-none d-md-flex">
        <VCard class="categories-card px-3 rounded-lg" min-width="450">
          <VList v-for="user in suggestionUsers" :key="user.id">
            <VAvatar size="50" class="mt-1">
              <img v-if="user.avatar != null" :src="user.avatar" class="avatar-img" />
              <img v-else src="@/assets/images/avatar.png" class="avatar-img" />
            </VAvatar>
            {{ user.full_name }}
          </VList>
        </VCard>
      </VCol>
    </VRow>
    <VBtn v-if="authUser" fab dark color="secondary" :to="'/posts/create'" class="fixed-bottom-right btn">
      <VIcon>mdi-plus</VIcon>
    </VBtn>
  </VContainer>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { PostsActionTypes } from "~/store/posts/actions";
import { UsersActionTypes } from "~/store/users/actions";

onMounted(() => {
  store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
  store.dispatch(`posts/${PostsActionTypes.fetchSuggestionsPosts}`);
  store.dispatch(`users/${UsersActionTypes.fetchSuggestionsUsers}`);
});

const suggestionPosts = computed(() => store.state.posts?.suggestionPosts);
const suggestionUsers = computed(() => store.state.users?.suggestionUsers);
const posts = computed(() => store.state.posts?.posts);
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

.categories-card {
  height: max-content;
}

.separator {
  display: flex;
  align-items: center;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid lightblue;
}

.separator:not(:empty)::before {
  margin-right: 2em;
}

.separator:not(:empty)::after {
  margin-left: 2em;
}
</style>
