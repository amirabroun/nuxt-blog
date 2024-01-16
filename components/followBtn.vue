<template>
  <VBtn
    :width="`${data.width}px`"
    :height="`${data.height}px`"
    class="ml-3 rounded-lg"
    :color="isFollow ? '#cdf1c6d2' : 'red'"
    style="font-size: 0.62rem"
    @click="toggleFollow(user.uuid)"
  >
    {{ isFollow ? "follow" : "unfollow" }}
  </VBtn>
</template>

<script setup lang="ts">
import { store } from "~/store";
import { UserActionTypes } from "~/store/user/actions";
import { UsersActionTypes } from "~/store/users/actions";

const route = useRoute();

const props = defineProps(["data"]);
const data = props.data;
let user = data.user;

onMounted(async () => {
  if (user && user.uuid) return;
  await store.dispatch(
    `user/${UserActionTypes.fetchUserPosts}`,
    route.params.uuid
  );
  user = store.state.user?.user;
});

const isFollow = computed(() => {
  if (!store.state.user?.user) return false;
  return store.state.user?.user.auth_followed_at;
});

async function toggleFollow(uuid: string) {
  await store.dispatch(`users/${UsersActionTypes.userToggleFollow}`, uuid);
  await store.dispatch(
    `user/${UserActionTypes.fetchUserPosts}`,
    route.params.uuid
  );
}
</script>
