<template>
  <v-btn style="min-width: 0" size="small">
    <v-icon icon="mdi-pencil" />
    <v-dialog activator="parent" max-width="500">
      <template v-slot:default="{ isActive }">
        <v-card rounded="md">
          <v-card-text>
            <div class="mb-2">Title</div>
            <v-text-field
              ref="title"
              required
              v-model="post.title"
              variant="outlined"
            />

            <div class="mb-2">Body</div>
            <v-textarea
              :counter="700"
              class="mb-2"
              v-model="post.body"
              rows="5"
              ref="body"
              variant="outlined"
              persistent-counter
            />

            <div v-if="!post.media?.find(() => true)?.original_url">
              <v-file-input
                label="Add image"
                color="info"
                prepend-icon="mdi-camera-outline"
                accept="image/*"
                ref="file"
                variant="solo-filled"
              />
            </div>
            <div v-else>
              <v-img
                :src="post.media?.find(() => true)?.original_url"
                class="rounded-lg w-100"
              />
            </div>
          </v-card-text>
          <v-divider class="mt-2"></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              v-if="post.media?.find(() => true)?.original_url"
              color="danger"
              rounded="md"
              variant="flat"
              class="text-none mr-auto"
              @click="deletePostImage()"
            >
              <v-icon icon="mdi-delete-outline" size="22" />
              Delete image
            </v-btn>

            <v-btn
              class="text-none"
              rounded="lg"
              text="Cancel"
              @click="isActive.value = false"
            />

            <v-btn
              class="text-none"
              color="primary"
              rounded="md"
              text="Update"
              variant="flat"
              @click="updatePost()"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { store } from "~/store";
import { Post } from "~/store/posts";
import {
  PostsActionTypes,
  deletePostImage as deletePostImageAction,
  updatePost as updatePostAction,
} from "~/store/posts/actions";
import { UserActionTypes } from "~/store/user/actions";

const props = defineProps<{
  post: Post;
}>();

let post = props.post;

const title = ref();
const body = ref();
const file = ref();

async function updatePost() {
  const formData = new FormData();
  formData.append("title", title.value.value);
  formData.append("body", body.value.value);
  formData.append("_method", "put");
  if (!post.media?.find(() => true)?.original_url) {
    if (file.value.files[0]) {
      formData.append("image", file.value.files[0]);
    }
  }

  updatePostAction(post.uuid, formData).then(() => {
    if (typeof post.user !== "undefined") {
      store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
      return;
    }
    
    const route = useRoute();
    store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
  });
}

async function deletePostImage() {
  deletePostImageAction(post.uuid).then(() => {
    if (typeof post.user !== "undefined") {
      store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
      return;
    }
    
    const route = useRoute();
    store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
  });
}
</script>