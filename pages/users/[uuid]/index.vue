<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="7">
        <VCard class="pa-2 mb-3" v-for="post in posts" :key="post.id">
          <VImg :src="post.media?.find(() => true)?.original_url" max-height="400" class="rounded-lg"></VImg>
          <VCardTitle class="text-h5">{{ post.title }}</VCardTitle>
          <VCardText>{{ post.body }}</VCardText>
          <VCardSubtitle>
            by <span class="text-primary">{{ user?.full_name }}</span>
            <span class="grey--text ml-1">{{ post.created_at }}</span>
          </VCardSubtitle>
        </VCard>
      </VCol>
      <VCol cols="4" class="d-none d-lg-flex">
        <VCard class="pa-3 user-info w-100">
          <VRow>
            <VCol cols="auto">
              <v-avatar size="50" class="rounded avatar">
                <img :src="user?.avatar" v-if="user?.avatar" class="rounded w-100" />
                <img src="@/assets/images/avatar.png" v-else class="rounded w-100" />
              </v-avatar>
            </VCol>
            <VCol cols="8">
              <div class="text-h6">{{ user?.full_name }}</div>
              <div class="grey--text">{{ user?.username }}</div>
            </VCol>
          </VRow>
          <VRow justify="center" align="center" class="px-2 py-3">
            <VCol cols="12" v-if="authUser" class="pa-0">
              <VBtn class="w-100" :color="followBtnColor" @click="sendFollowing(followBtnText)" ref="followBtn">
                {{ followBtnText }}
              </VBtn>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
    <VBtn v-if="authUser" fab dark color="secondary" :to="'/posts/create'" class="fixed-bottom-right btn">
      <VIcon>mdi-plus</VIcon>
    </VBtn>
  </VContainer>
</template>
<script lang="ts" setup>
import { store } from "~/store";
import { UserActionTypes } from "~/store/user/actions";
import { UsersActionTypes } from "~/store/users/actions";
const route = useRoute();
const followBtn = ref();
let followBtnText: string = "Follow";
let followBtnColor: string = "success";

async function sendFollowing(text: string) {
  await store.dispatch(
    `users/${UsersActionTypes.userToggleFollow}`,
    route.params.uuid
  );
  await store.dispatch(
    `user/${UserActionTypes.fetchUserPosts}`,
    route.params.uuid
  );
}

onMounted(() => {
  store.dispatch(`user/${UserActionTypes.fetchUserPosts}`, route.params.uuid);
});

const user = computed(() => store.state.user?.user);
const posts = computed(() => store.state.user?.user?.posts);
const authUser = computed(() => store.state.auth?.authUser);

</script>
<style scoped>
.btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.3rem;
}

.user-info {
  height: max-content;
}
</style>
