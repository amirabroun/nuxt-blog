<template>
  <v-btn-group density="compact">
    <post-delete-btn v-if="isOwner" :post="post" />
    <post-edit-btn v-if="isOwner" :post="post" />

    <v-btn @click="toggleLike()" prepend-icon="mdi-heart-outline" size="small">
      <span class="py-auto">
        {{ post.likes_count }}
      </span>
    </v-btn>
  </v-btn-group>
</template>

<script setup lang="ts">
import { store } from "~/store";
import { Post } from "~/store/posts";
import { PostsActionTypes, toggleLikePost } from "~/store/posts/actions";
import { UserActionTypes } from "~/store/user/actions";
const props = defineProps<{
  post: Post;
  isOwner: boolean;
}>();
const post = props.post;

async function toggleLike() {
  await toggleLikePost(post.uuid).then(() => {
    if (typeof post.user !== "undefined") {
      store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
      return;
    }

    const route = useRoute();
    store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
  });
}
</script>
