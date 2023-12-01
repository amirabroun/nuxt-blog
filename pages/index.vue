<template>
    <div class="row mx-2 mt-6">
        <div class="col-lg-1"></div>
      
        <div class="col-sm-12 col-md-12 col-lg-7">
            <v-card v-for="post in posts" :key="post.id" class="mb-3 p-2 bg-light">
                
                <v-img :src="post.media?.find(() => true)?.original_url" max-height="300" class="bg-secondary rounded-lg"></v-img>
                <v-card-title class="text-h5">
                    {{ post.title }}
                </v-card-title>

                <v-card-title class="text-dark mt-2">
                    <p class="card-text">{{ post.body }}</p>

                    <span class="text-muted" style="font-size: 13px"> by </span>
                    <NuxtLink class="text-primary" :to="`/users/${post.user.uuid}`" style="font-size: 16px">{{ post.user.full_name }}</NuxtLink>
                    <span class="text-muted ml-1" style="font-size: 13px">at {{ post.created_at }}</span>
                </v-card-title>
            </v-card>
        </div>

        <div class="col-md-3 col-lg-3 d-none d-lg-block d-xl-block">
            <div class="card">
                <ul class="list-group list-group-flush">
                    <li v-for="category in categories" :key="category.id" class="list-group-item bg-light">
                        <a style="font-size: 23px" class="mr-2" href="#">
                            #
                        </a>
                        <a class="text-dark" :href="category.uuid">
                            {{ category.title }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-lg-1"></div>

        <v-btn v-if="authUser" icon="mdi-plus" class="text-white bg-primary" size="50px" to="/posts/create"
            style="position: fixed; right: 20px; bottom: 20px;" />
    </div>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { PostsActionTypes } from "~/store/posts/action-types";
import { CategoriesActionTypes } from "~/store/categories/action-types";

onMounted(() => {
    store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
});

onMounted(() => {
    store.dispatch(`categories/${CategoriesActionTypes.fetchCategories}`);
});

const posts = computed(() => store.state.posts?.posts);
const authUser = computed(() => store.state.auth?.authUser);
const categories = computed(() => store.state.categories?.categories);

</script>