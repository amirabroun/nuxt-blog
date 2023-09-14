<template>
    <div class="row mt-6 mx-2">
        <div class="col-lg-1"></div>

        <div class="col-sm-12 col-md-12 col-lg-7 bg-light card p-3">
            <div v-for="post in posts" :key="post.id" class="mt-4">
                <h2 class="text-dark">{{ post.title }}</h2>
                <br>
                <p class="card-text">{{ post.body }}</p>

                <span class="text-muted"> by </span>
                <span class="text-primary">{{ user?.full_name }}</span>
                <span class="text-muted ml-1" style="font-size: 13px">at {{ post.created_at }}</span>

                <br>
                <br>
                <hr>
            </div>
        </div>

        <div class="col-md-3 col-lg-3 d-none d-lg-block d-xl-block">
            <div class="card p-3">
                <div class="row">
                    <div class="col-4">
                        <v-avatar size="80px" rounded="4">
                            <img v-if="user?.avatar != null" :src="user.avatar" class="w-100" />
                            <img v-else src="@/assets/images/avatar.png" class="w-100" />
                        </v-avatar>
                    </div>

                    <div class="col-7">
                        <h5 class="text-dark">
                            {{ user?.full_name }}
                        </h5>
                        <h6 class="text-muted">
                            {{ user?.username }}
                        </h6>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-1 d-sm-none"></div>

        <v-btn icon="mdi-plus" class="text-white bg-primary" size="50px" to="/posts/create"
            style="position: fixed; right: 20px; bottom: 20px;" tooltip-text="21212" />
    </div>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { UserActionTypes } from "~/store/user/action-types";
const route = useRoute();

onMounted(() => {
    store.dispatch(`user/${UserActionTypes.fetchUserPosts}`, route.params.uuid);
});

const user = computed(() => store.state.user?.user);
const posts = computed(() => store.state.user?.user?.posts);


</script>
