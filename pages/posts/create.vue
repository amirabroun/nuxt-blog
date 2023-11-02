<template>
    <div class="row mt-6 mx-2">
        <div class="col-lg-2 col-md-2"></div>

        <div class="col-sm-12 col-md-8 col-lg-7 bg-light card py-6">
            <v-form class="row" enctype="multipart/form-data">
                <div class="col-sm-12 col-lg-4 mb-6">
                    <v-select label="Select" :items="categories" variant="solo-filled" />
                </div>

                <div class="col-sm-12 col-lg-8 mb-6">
                    <v-text-field v-model="title" required variant="solo-filled" placeholder="title" />
                </div>

                <div class="col-sm-12 mb-6">
                    <v-textarea v-model="body" required variant="solo-filled" placeholder="Write your body" />
                </div>

                <div class="col-12 mb-6">
                    <input type="file" name="file" @change="previewFiles" multiple tabindex="-1">
                    <!-- <v-file-input name="file" type="file" accept="image/*" label="File input"></v-file-input> -->
                </div>

                <div class="col-12">
                    <v-btn color="info" class="w-100 p-2 rounded mt-2" @click="createPost">
                        Create
                    </v-btn>
                </div>
            </v-form>

            <hr>
            <NuxtLink class="text-danger" to="/" style="font-size: 14px;">Back to Blog</NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>



import { store } from "~/store";
import { CategoriesActionTypes } from "~/store/categories/action-types";
import { PostsActionTypes } from "~/store/posts/action-types";

onMounted(() => {
    store.dispatch(`categories/${CategoriesActionTypes.fetchCategories}`);
});

const categories = computed(() => store.state.categories?.categories);
const title = ref<string>();
const body = ref<string>();

var file = ref(null);

const previewFiles = (event: any) => {
    file = event.target.files[0];
    console.log(file);

};

const createPost = async (event: any) => {
    store.dispatch(`posts/${PostsActionTypes.createPost}`, {
        title: title.value,
        body: body.value,
        image: file.value,
    });
};
</script>
