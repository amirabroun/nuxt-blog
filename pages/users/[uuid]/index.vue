<template>
  <VContainer fluid>
    <VRow justify="center">
      <VCol lg="1" class="d-none d-lg-flex"></VCol>
      <VCol lg="6" md="6">
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
            <span class="text-grey ml-1">{{ post.created_at }}</span>
          </VCardSubtitle>
        </VCard>
      </VCol>
      <VCol lg="4" md="6" sm="12">
        <VCard class="pa-3 user-info w-100">
          <VRow>
            <VCol cols="3" lg="3" md="3">
              <img
                :src="user?.avatar"
                v-if="user?.avatar"
                width="100"
                class="rounded-xl"
              />
              <img
                src="@/assets/images/avatar.png"
                v-else
                width="100"
                class="rounded-xl"
              />
            </VCol>
            <VCol cols="9" lg="9" md="9" class="mt-3">
              {{ user?.full_name }}
              <FollowBtn
                :data="{ user: user, width: 80, height: 25 }"
                v-if="authUser && authUser.uuid != user?.uuid"
              />
              <div class="mt-3" style="font-size: 20px">
                {{ user?.username }}
              </div>
              <VRow class="text-grey">
                <VCol cols="8">
                  {{ user?.followers_count }} follower
                  <span class="ml-3"
                    >{{ user?.followings_count }} followings</span
                  >
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="9" lg="9" md="9" class="mt-3">
              Followings
              <VList
                v-for="following in user?.followings"
                :key="following.uuid"
                class="list"
              >
                <VAvatar size="50" class="mt-1">
                  <img
                    v-if="following.avatar != null"
                    :src="following.avatar"
                    class="avatar-img"
                  />
                  <img
                    v-else
                    src="@/assets/images/avatar.png"
                    class="avatar-img"
                  />
                </VAvatar>
                <NuxtLink
                  class="text-info ml-2"
                  :to="`/users/${following.uuid}`"
                  >{{ following.full_name }}
                  <FollowBtn :data="{ user: user, width: 50, height: 25 }" />
                </NuxtLink>
              </VList>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
      <VCol lg="1" class="d-none d-lg-flex"></VCol>
    </VRow>
    <createPostBtn :isAuth="authUser" />
  </VContainer>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { UserActionTypes } from "~/store/user/actions";
import { UsersActionTypes } from "~/store/users/actions";

const route = useRoute();
let user = ref();

onMounted(() => {
  store.dispatch(`user/${UserActionTypes.fetchUserPosts}`, route.params.uuid);
});

user = computed(() => store.state.user?.user);

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
