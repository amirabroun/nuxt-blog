<template>
  <v-btn style="min-width: 0" size="small">
    <v-icon icon="mdi-delete" />
    <v-dialog v-model="activeDeleteCard" activator="parent" max-width="500">
      <v-card>
        <v-card-text>
          <div class="mb-4">Are you sure you want to delete this post ?</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            class="text-none"
            rounded="lg"
            text="Cancel"
            @click="activeDeleteCard = false"
          />

          <v-btn
            color="danger"
            variant="flat"
            text="Delete post"
            class="text-none"
            @click="deletePost()"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { store } from "~/store";
import { Post } from "~/store/posts";
import {
  deletePost as deletePostAction,
  PostsActionTypes,
} from "~/store/posts/actions";
import { UserActionTypes } from "~/store/user/actions";

const props = defineProps<{
  post: Post;
}>();

let post = props.post;

const activeDeleteCard = ref(false);

async function deletePost() {
  deletePostAction(post.uuid).then(() => {
    if (typeof post.user !== "undefined") {
      store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
      activeDeleteCard.value = false;

      return;
    }

    activeDeleteCard.value = false;
    const route = useRoute();
    store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
  });
}
</script>