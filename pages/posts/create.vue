<template>
  <v-row justify="center" class="mt-16">
    <v-card class="pa-6" elevation="2" width="600">
      <v-row>
        <v-col cols="12" lg="4">
          <v-select label="Select" :items="categories" />
        </v-col>

        <v-col cols="12" lg="8">
          <v-textField ref="title" required placeholder="title" />
        </v-col>

        <v-col cols="12">
          <v-textarea ref="body" required placeholder="Write your body" />
        </v-col>

        <v-col cols="12">
          <v-file-input label="File input" accept="image/*" ref="file" />
        </v-col>

        <v-card-actions>
          <v-btn color="primary" @click="createPost()" variant="flat">
            Create
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { CategoriesActionTypes } from "~/store/categories/action-types";
import { PostsActionTypes } from "~/store/posts/actions";

const categories = computed(() => store.state.categories?.categories);
onMounted(() => {
  store.dispatch(`categories/${CategoriesActionTypes.fetchCategories}`);
});

const title = ref();
const body = ref();
const file = ref();

const authUser = store.getters["auth/getAuthUser"];

async function createPost() {
  let formData = new FormData();

  formData.append("title", title.value.value);
  formData.append("body", body.value.value);
  if (file.value.files[0]) {
    formData.append("image", file.value.files[0]);
  }

  store.dispatch(`posts/${PostsActionTypes.createPost}`, formData);

  setTimeout(() => {
    navigateTo(`/users/${authUser.uuid}`);
  }, 1000);
}
</script>
