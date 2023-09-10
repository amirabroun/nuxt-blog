<template>
    <div class="col mt-6">
        <div class="row main-section">
            <div class="col-lg-1"></div>

            <div class="col-sm-12 col-md-12 col-lg-7 bg-light card p-4">
                <div v-for="post in posts" :key="post.id" class="mt-4">
                    <NuxtLink class="text-dark" href="#">
                        <h2>
                            {{ post.title }}
                        </h2>
                    </NuxtLink>
                    <br>
                    <p class="card-text">
                        {{ post.body }}
                    </p>
                    <NuxtLink class="text-primary" :to="`/users/${post.user.uuid}/resume`">
                        {{ post.user.full_name }}
                    </NuxtLink>
                    <span class="text-muted ml-1" style="font-size: 13px"> at </span>
                    <span class="text-muted ml-1" style="font-size: 13px">{{ post.created_at }}</span>
                    <br>
                    <hr>
                </div>
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
        </div>
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
const categories = computed(() => store.state.categories?.categories);

</script>