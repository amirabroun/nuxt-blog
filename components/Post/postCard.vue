<template>
  <VCard
    class="relative pa-3 py-1 mb-3"
    v-for="post in posts"
    :key="post.title"
    rounded="sm"
  >
    <div v-if="authUser" class="pa-2 text-right">
      <v-btn-group density="compact">
        <div class="mt-1" v-if="post.user?.uuid === authUser?.uuid">
          <post-delete-btn :post="post" />
          <post-edit-btn :post="post" />
        </div>

        <v-btn
          @click="
            toggleLikePost(post.uuid).then(() =>
              store.dispatch(`posts/${PostsActionTypes.fetchPosts}`)
            )
          "
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

    <VImg
      :src="post.media?.find(() => true)?.original_url"
      class="rounded-lg mt-4"
    />
    <v-card-title class="text-h5">{{ post.title }}</v-card-title>
    <VCardText>{{ post.body }}</VCardText>
    <VCardSubtitle class="mb-3">
      by
      <NuxtLink
        class="text-info ml-1"
        :to="`/users/${post.user?.uuid}/profile`"
      >
        {{ post.user?.full_name }}
      </NuxtLink>
      at
      <span class="text-dark ml-1">{{ post.created_at }}</span>
    </VCardSubtitle>
  </VCard>
</template>

<script setup lang="ts">
import { store } from "~/store";
import { PostsActionTypes, toggleLikePost } from "~/store/posts/actions";

const posts = computed(() => store.state.posts?.posts);
const authUser = computed(() => store.state.auth?.authUser);
</script>
