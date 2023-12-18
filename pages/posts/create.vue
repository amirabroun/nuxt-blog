<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="8" lg="7">
        <VCard class="pa-6" elevation="2">
          <VForm enctype="multipart/form-data">
            <VRow>
              <VCol cols="12" lg="4" class="mb-6">
                <VSelect label="Select" :items="categories" solo />
              </VCol>

              <VCol cols="12" lg="8" class="mb-6">
                <VTextField ref="title" required solo placeholder="title" />
              </VCol>

              <VCol cols="12" class="mb-6">
                <VTextarea
                  ref="body"
                  required
                  solo
                  placeholder="Write your body"
                />
              </VCol>

              <VCol cols="12" class="mb-6">
                <VFileInput
                  label="File input"
                  accept="image/*"
                  ref="file"
                ></VFileInput>
              </VCol>

              <VCol cols="12">
                <VBtn color="info" block class="py-2 mt-2" @click="createPost">
                  Create
                </VBtn>
              </VCol>
            </VRow>
          </VForm>

          <VDivider></VDivider>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
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
