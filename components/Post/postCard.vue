<template>
  <VCard class="relative pa-3 py-1 mb-3" v-for="post in posts" :key="post.id" rounded="sm">
    <div
      v-if="authUser && (authUser?.uuid === user?.uuid ?? post.user.uuid)"
      class="pa-2 text-right"
    >
      <post-options :post="post"></post-options>
      <v-divider class="my-3"></v-divider>

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
        :to="`/users/${user?.uuid ?? post.user.uuid}`"
      >
        {{ user?.full_name ?? post.user.full_name }}
      </NuxtLink>
      at
      <span class="text-dark ml-1">{{ post.created_at }}</span>
    </VCardSubtitle>
  </VCard>
</template>

<script setup lang="ts">
import { store } from "~/store";
import { Post } from "~/store/posts";
import { User } from "~/store/user";

const props = defineProps<{
  user?: User | null;
  posts: Post[];
}>();

const posts = props.posts;
const user = props.user;
const authUser = computed(() => store.state.auth?.authUser);
</script>
