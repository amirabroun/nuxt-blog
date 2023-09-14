<template>
    <div class="row mt-6 mx-2">
        <div class="col-lg-2 col-md-2"></div>

        <div class="col-sm-12 col-md-8 col-lg-7 bg-light card py-6">
            <form enctype="multipart/form-data">
                <div class="row">
                    <div class="col-sm-12 col-lg-4 mb-6">
                        <select class="p-2 rounded w-100 shadow" name="category_id">
                            <option v-for="category in categories" :key="category.id" value="{{ category.id }}">
                                {{ category.title }}
                            </option>
                        </select>
                    </div>

                    <div class="col-sm-12 col-lg-8 mb-6">
                        <input type="text" class="p-2 rounded w-100 shadow" name="title" id="name" placeholder="title">
                    </div>

                    <div class="col-sm-12 mb-6">
                        <textarea class="form-text-area mt-1 p-2 rounded w-100 shadow" name="body" id="message" cols="30"
                            rows="4" placeholder="Write your body" />
                    </div>

                    <div class="col-12 mb-6">
                        <input name="image" type="file" />
                    </div>

                    <div class="col-12">
                        <input type="submit" value="Create" class="btn btn-info w-100 shadow-sm p-2 rounded mt-2">
                    </div>
                </div>
            </form>

            <hr>
            <NuxtLink class="text-danger" to="/" style="font-size: 14px;">Back to Blog</NuxtLink>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { store } from "~/store";
import { CategoriesActionTypes } from "~/store/categories/action-types";

onMounted(() => {
    store.dispatch(`categories/${CategoriesActionTypes.fetchCategories}`);
});

const categories = computed(() => store.state.categories?.categories);

</script>

<style>
input[type=file]::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #343a40;
    padding: 8px 30px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
}
</style>
