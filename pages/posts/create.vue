<template>
  <div class="row mt-6 mx-2">
    <div class="col-lg-2 col-md-2"></div>

    <div class="col-sm-12 col-md-8 col-lg-7 bg-light card py-6">
      <v-form class="row" enctype="multipart/form-data" ref="form">
        <div class="col-sm-12 col-lg-4 mb-6">
          <v-select label="Select" :items="categories" variant="solo-filled" />
        </div>

        <div class="col-sm-12 col-lg-8 mb-6">
          <v-text-field
            ref="title"
            required
            variant="solo-filled"
            placeholder="title"
            :rules="titleRules"
          />
        </div>

        <div class="col-sm-12 mb-6">
          <v-textarea
            ref="body"
            required
            variant="solo-filled"
            placeholder="Write your body"
            :rules="bodyRules"
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
import { showToastErrorMessage } from "~/store/app/mutations";

const categories = computed(() => store.state.categories?.categories);
onMounted(() => {
  store.dispatch(`categories/${CategoriesActionTypes.fetchCategories}`);
});

const title = ref();
const body = ref();
const file = ref();
const form = ref();
let isValid = ref(false);

const titleRules: Array<(v: string) => boolean | string> = [
  (value: string): boolean | string => !!value || "You must enter a title",
  (value: string): boolean | string =>
    (value && value.length > 10) ||
    "The title cannot be less than 10 characters",
  (value: string): boolean | string =>
    (value && value.length < 50) ||
    "The title cannot have more than 50 characters",
];

const bodyRules: Array<(v: string) => boolean | string> = [
  (value: string): boolean | string => !!value || "You must enter a body",
  (value: string): boolean | string =>
    (value && value.length > 10) ||
    "The body cannot be less than 10 characters",
  (value: string): boolean | string =>
    (value && value.length < 200) ||
    "The body cannot have more than 200 characters",
];

async function createPost() {
  await form.value.validate().then((res: any): void => {
    isValid.value = res.valid;
  });

  if (isValid.value && file.value.files[0]) {
    let formData = new FormData();
    formData.append("title", title.value);
    formData.append("body", body.value);
    if (file.value && file.value.files) {
      formData.append("image", file.value.files[0]);
    }

    await store.dispatch(`posts/${PostsActionTypes.createPost}`, formData);
  } else {
    showToastErrorMessage(store.commit, "Form is not valid");
  }
}
</script>
