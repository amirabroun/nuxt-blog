<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="8">
        <v-tabs v-model="tab">
          <v-tab value="followings">Your followings</v-tab>
          <v-tab
            class="tab-item rounded"
            value="suggestion"
            @click.once="fetchSuggestion"
            >Suggestion for you</v-tab
          >
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="followings">
            <div>
              <div v-if="posts">
                <VCard
                  v-for="post in posts"
                  :key="post.id"
                  class="mb-3 pa-2 rounded-lg"
                  flat
                >
                  <VImg
                    :src="post.media?.find(() => true)?.original_url"
                    max-height="400"
                    class="rounded-lg"
                  ></VImg>
                  <VCardTitle class="text-h5 my-4">
                    {{ post.title }}
                  </VCardTitle>
                  <VCardText>
                    <div>{{ post.body }}</div>
                    <div class="text-grey mt-3">
                      by
                      <NuxtLink
                        class="text-info"
                        :to="`/users/${post.user.uuid}`"
                      >
                        {{ post.user.full_name }}
                      </NuxtLink>
                      <span class="ml-1">at {{ post.created_at }}</span>
                    </div>
                  </VCardText>
                </VCard>
              </div>
              <v-alert v-else title="Empty List" text="There are no posts!" />
            </div>
          </v-window-item>

          <v-window-item value="suggestion">
            <div>
              <div v-if="suggestionPosts">
                <VCard
                  v-for="post in suggestionPosts"
                  :key="post.id"
                  class="mb-3 pa-2 rounded-lg"
                  flat
                >
                  <VImg
                    :src="post.media?.find(() => true)?.original_url"
                    max-height="400"
                    class="rounded-lg"
                  ></VImg>
                  <VCardTitle class="text-h5 my-4">
                    {{ post.title }}
                  </VCardTitle>
                  <VCardText>
                    <div>{{ post.body }}</div>
                    <div class="text-grey mt-3">
                      by
                      <NuxtLink
                        class="text-info"
                        :to="`/users/${post.user.uuid}`"
                      >
                        {{ post.user.full_name }}
                      </NuxtLink>
                      <span class="ml-1">at {{ post.created_at }}</span>
                    </div>
                  </VCardText>
                </VCard>
              </div>

              <v-alert
                v-else
                title="Empty List"
                text="There are no posts to suggest!"
              />
            </div>
          </v-window-item>
        </v-window>
      </VCol>
      <VCol v-if="authUser" cols="12" md="4" class="d-none d-lg-flex mt-12">
        <VCard class="categories-card px-3 rounded-lg" min-width="450">
          <VList
            v-for="(user, index) in suggestionUsers"
            :key="index"
            class="list"
          >
            <VAvatar size="50" class="mt-1">
              <img
                v-if="user.avatar != null"
                :src="user.avatar"
                class="avatar-img"
              />
              <img v-else src="@/assets/images/avatar.png" class="avatar-img" />
            </VAvatar>
            <NuxtLink class="text-info ml-3" :to="`/users/${user.uuid}`">
              {{ user.full_name }}
            </NuxtLink>
            <VBtn
              width="80px"
              height="25px"
              v-if="authUser && authUser.uuid != user?.uuid"
              @click="toggleFollow(user?.uuid)"
              class="ml-4 rounded-lg"
              color="#cdf1c6d2"
              style="font-size: 0.62rem"
            >
              {{ user?.auth_followed_at == null ? "follow" : "unfollow" }}
            </VBtn>
          </VList>
        </VCard>
      </VCol>
    </VRow>
    <createPostBtn :isAuth="authUser" />
  </VContainer>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { PostsActionTypes } from "~/store/posts/actions";
import { UsersActionTypes } from "~/store/users/actions";

let tab = ref(0);
let posts = ref();
let suggestionUsers = ref();

const authUser = computed(() => store.state.auth?.authUser);
const suggestionPosts = computed(() => store.state.posts?.suggestionPosts);

async function fetchSuggestion() {
  await store.dispatch(`posts/${PostsActionTypes.fetchSuggestionsPosts}`);
}

onMounted(async () => {
  if (authUser) {
    store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
    posts = computed(() => store.state.posts?.posts);

    await store.dispatch(`users/${UsersActionTypes.fetchSuggestionsUsers}`);
    suggestionUsers.value = store.state.users?.suggestionUsers;
  }
});

async function toggleFollow(uuid: string) {
  if (suggestionUsers.value?.length! > 1) {
    await store.dispatch(`users/${UsersActionTypes.userToggleFollow}`, uuid);
    suggestionUsers.value = suggestionUsers.value?.filter(
      (user: { uuid: string }) => user.uuid !== uuid
    );
  } else {
    await store.dispatch(`users/${UsersActionTypes.fetchSuggestionsUsers}`);
    suggestionUsers.value = store.state.users?.suggestionUsers;
  }
  store.dispatch(`posts/${PostsActionTypes.fetchPosts}`);
}
</script>

<style scoped>
.btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.5rem;
  color: 1px solid rgb(77, 186, 223);
}

.categories-card {
  height: max-content;
}

.separator {
  display: flex;
  align-items: center;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid lightblue;
}

.separator:not(:empty)::before {
  margin-right: 2em;
}

.separator:not(:empty)::after {
  margin-left: 2em;
}

.follow-box {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  align-items: center;
  transition: all 0.4s;
}

.follow-btn {
  font-size: 0.7rem;
  border: 1px solid;
  border-color: #4caf50;
  color: #4caf50;
}
</style>
