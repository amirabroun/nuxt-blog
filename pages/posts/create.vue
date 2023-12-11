<template>
  <div class="row mt-6 mx-2">
    <div class="col-lg-2 col-md-2"></div>

    <div class="col-sm-12 col-md-8 col-lg-7 bg-light card py-6">
      <v-form class="row" enctype="multipart/form-data">
        <div class="col-sm-12 col-lg-4 mb-6">
          <v-select label="Select" :items="categories" variant="solo-filled" />
        </div>

        <div class="col-sm-12 col-lg-8 mb-6">
          <v-text-field
            ref="title"
            required
            variant="solo-filled"
            placeholder="title"
          />
        </div>

        <div class="col-sm-12 mb-6">
          <v-textarea
            ref="body"
            required
            variant="solo-filled"
            placeholder="Write your body"
          />
        </div>

        <div class="col-12 mb-6">
          <v-file-input
            label="File input"
            accept="image/*"
            ref="file"
          ></v-file-input>
        </div>

        <div class="col-12">
          <v-btn
            color="info"
            class="w-100 p-2 rounded mt-2"
            @click="createPost"
          >
            Create
          </v-btn>
        </div>
      </v-form>

      <hr />
      <NuxtLink class="text-danger" to="/" style="font-size: 14px"
        >Back to Blog</NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { CategoriesActionTypes } from "~/store/categories/action-types";
import { PostsActionTypes } from "~/store/posts/action-types";

const categories = computed(() => store.state.categories?.categories);
onMounted(() => {
  store.dispatch(`categories/${CategoriesActionTypes.fetchCategories}`);
});

const title = ref();
const body = ref();
const file = ref();

async function createPost() {
  let formData = new FormData();

  formData.append("title", title.value.value);
  formData.append("body", body.value.value);
  if (file.value.files[0]) {
    formData.append("image", file.value.files[0]);
  }

  store.dispatch(`posts/${PostsActionTypes.createPost}`, formData);
}
</script>
