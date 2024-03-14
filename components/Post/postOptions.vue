<template>
  <v-btn-group density="compact">
    <post-delete-btn :post="post" />
    <post-edit-btn :post="post" />
  </v-btn-group>
</template>

<script setup lang="ts">
import { Post } from "~/store/posts";
defineProps<{
  post: Post;
}>();
</script>
