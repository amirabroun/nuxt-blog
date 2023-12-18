<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="7">
        <VCard class="pa-2 mb-3" v-for="post in posts" :key="post.id">
          <VImg
            :src="post.media?.find(() => true)?.original_url"
            max-height="400"
            class="rounded-lg"
          ></VImg>
          <VCardTitle class="text-h5">{{ post.title }}</VCardTitle>
          <VCardText>{{ post.body }}</VCardText>
          <VCardSubtitle>
            by <span class="text-primary">{{ user?.full_name }}</span>
            <span class="grey--text ml-1">{{ post.created_at }}</span>
          </VCardSubtitle>
        </VCard>
      </VCol>

      <VCol cols="3" class="d-none d-lg-flex">
        <VCard class="pa-3 user-info">
          <VRow>
            <VCol cols="4">
              <v-avatar size="50" class="rounded avatar">
                <img
                  :src="user?.avatar"
                  v-if="user?.avatar"
                  class="rounded w-100"
                />
                <img
                  src="@/assets/images/avatar.png"
                  v-else
                  class="rounded w-100"
                />
              </v-avatar>
            </VCol>
            <VCol cols="8">
              <div class="text-h6 text-center">{{ user?.full_name }}</div>
              <div class="grey--text text-center">{{ user?.username }}</div>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>

    <VBtn
      v-if="user"
      fab
      dark
      color="secondary"
      :to="'/posts/create'"
      class="fixed-bottom-right btn"
    >
      <VIcon>mdi-plus</VIcon>
    </VBtn>
  </VContainer>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { UserActionTypes } from "~/store/user/actions";
const route = useRoute();

onMounted(() => {
  store.dispatch(`user/${UserActionTypes.fetchUserPosts}`, route.params.uuid);
});

const user = computed(() => store.state.user?.user);
const posts = computed(() => store.state.user?.user?.posts);

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
