<template>
  <v-btn style="min-width: 0" size="small">
    <v-icon icon="mdi-delete" />
    <v-dialog activator="parent" max-width="500">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-text>
            <div class="mb-4">Are you sure you want to delete this post ?</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              class="text-none"
              rounded="lg"
              text="Cancel"
              @click="isActive.value = false"
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
      </template>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { Post } from "~/store/posts";
import { deletePost as deletePostAction } from "~/store/posts/actions";

const props = defineProps<{
  post: Post;
}>();

let post = props.post;

async function deletePost() {
  deletePostAction(post.uuid).then(() => {
    setTimeout(() => {
      reloadNuxtApp();
    }, 500);
  });
}
</script>