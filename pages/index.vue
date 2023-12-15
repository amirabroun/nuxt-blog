<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="7">
        <VCard
          v-for="post in posts"
          :key="post.id"
          class="mb-3 pa-2 rounded-lg"
          flat
        >
          <VImg
            :src="post.media?.find(() => true)?.original_url"
            max-height="400"
            class="rounded-lg"
          ></VImg>
          <VCardTitle class="text-h5 my-4">
            {{ post.title }}
          </VCardTitle>

          <VCardText>
            <div>{{ post.body }}</div>

            <div class="grey--text">
              by
              <NuxtLink
                class="primary--text"
                :to="`/users/${post.user.uuid}`"
                >{{ post.user.full_name }}</NuxtLink
              >
              <span class="ml-1">at {{ post.created_at }}</span>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="3" class="d-none d-md-flex">
        <VCard class="mx-auto categories-card" max-width="300" min-width="250">
          <VList
            :items="categories"
            iteTitle="title"
            item-value="title"
          ></VList>
        </VCard>
      </VCol>
    </VRow>

    <VBtn
      v-if="authUser"
      fab
      dark
      color="secondary"
      :to="'/posts/create'"
      class="fixed-bottom-right btn"
    >
      <VIcon>mdi-plus</VIcon>
    </VBtn>
  </VContainer>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { PostsActionTypes } from "~/store/posts/action-types";
import { CategoriesActionTypes } from "~/store/categories/action-types";

onMounted(() => {
  store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
  store.dispatch(`categories/${CategoriesActionTypes.fetchCategories}`);
});

const posts = computed(() => store.state.posts?.posts);
const authUser = computed(() => store.state.auth?.authUser);
const categories = computed(() => store.state.categories?.categories);
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
</style>
