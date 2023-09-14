<template>
    <div class="row main-section mt-6">
        <div class="col-lg-2"></div>
        <div class="col-sm-12 col-md-12 col-lg-7 bg-light card p-4">
            <form enctype="multipart/form-data">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <select class="form-input" id="exampleFormControlSelect1" name="category_id">
                                <option v-for="category in categories" :key="category.id" value="{{ category.id }}">
                                    {{ category.title }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="col-6 col-lg-9 mt-2">
                        <input type="text" class="form-input" name="title" id="name" placeholder="title">
                    </div>

                    <div class="col-md-12 mb-3 mt-4">
                        <span class="text bg-light p-1">Description</span>
                        <textarea class="form-text-area mt-1" name="body" id="message" cols="30" rows="4"
                            placeholder="Write your body"></textarea>
                    </div>

                    <div class="row">
                        <div class="col-sm-12 col-md-6" id="one">
                            <h5 class="mt-4">Upload image</h5>
                            <div id="uploader form-input">
                                <div class="row uploadDoc mt-4 ">
                                    <div class="col-sm-3 ">
                                        <div class="fileUpload btn btn-orange ">
                                            <input name="image" type="file" class="upload up " />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 form-group mt-5 mb-1">
                            <input type="submit" value="Create" class="btn btn-info shadow py-2  px-4 rounded">
                        </div>
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