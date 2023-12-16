<template>
  <client-only>
    <VContainer class="pa-2 elevation-10 rounded-b-lg ma-0 pl-5" fluid>
      <VRow justify="start" align="center">
        <VCol cols="auto">
          <VAvatar>
            <NuxtLink v-if="authUser && authUser.avatar != null">
              <img
                :src="authUser.avatar"
                width="40"
                height="40"
                class="rounded avatar-img"
                @error="handleImageError"
              />
            </NuxtLink>
            <NuxtLink v-else>
              <img
                src="@/assets/images/avatar.png"
                width="40"
                height="40"
                class="rounded avatar-img"
              />
            </NuxtLink>
          </VAvatar>
          <VMenu activator="parent" v-if="authUser">
            <VList>
              <VListItem :to="`/users/${authUser?.uuid}/resume`">
                <VListItemTitle class="text-black">
                  <VIcon class="mr-2"> mdi-account</VIcon
                  >Profile</VListItemTitle
                >
              </VListItem>
              <VListItem @click="logout">
                <VListItemTitle class="text-red">
                  <VIcon class="mr-2">mdi-logout /></VIcon>
                  Logout
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VCol>

        <VCol cols="auto" class="px-0">
          <NuxtLink to="/" class="logo-link">
            <img src="@/assets/images/logo-e-blog-1.png" class="logo-img" />
          </NuxtLink>
        </VCol>
        <VCol cols="auto" v-if="!authUser">
          <NuxtLink to="/login" class="text-decoration-none">Login</NuxtLink>
        </VCol>
        <VCol cols="auto" v-if="!authUser">
          <span>|</span>
        </VCol>
        <VCol cols="auto" v-if="!authUser">
          <NuxtLink to="/register" class="text-decoration-none"
            >Register</NuxtLink
          >
        </VCol>
        <VCol cols="auto" v-if="authUser && authUser.is_admin == true">
          <NuxtLink to="/users" class="text-decoration-none">Users</NuxtLink>
        </VCol>
      </VRow>
    </VContainer>
    <slot />
  </client-only>
</template>
<script lang="ts" setup>
import { Status, store } from "~/store";
import { AuthActionTypes } from "~/store/auth/action-types";
const router = useRouter();
const authUser = computed(() => store.state.auth?.authUser);
const isLoggedIn = computed(() => store.getters["auth/isAuth"]);
const loggingOutStatus = computed(() => store.state.auth?.loggingOutStatus);

const list = [
  { text: "Profile", icon: "mdi-account" },
  { text: "Logout", icon: "mdi-logout" },
];

watch(
  () => loggingOutStatus.value,
  () => {
    if (loggingOutStatus.value == Status.success) {
      router.push("/");
    }
  }
);
onMounted(() => {
  if (isLoggedIn.value) store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
});
const logout = async () => {
  store.dispatch(`auth/${AuthActionTypes.logOut}`);
};
const handleImageError = (event: any) => {
  event.target.src = new URL(
    `@/assets/images/avatar.png`,
    import.meta.url
  ).href;
};
</script>

<style lang="scss">
body {
  font-family: "ubuntu", sans-serif;
  background: linear-gradient(to left, #00416a, #e4e5e6);
}

a {
  text-decoration: none;
}

.avatar-img {
  cursor: pointer;
}

.logo-link {
  display: block;
  width: 80px;
  overflow-y: hidden;
  height: 50px;
  display: flex;
  align-items: center;
}

.logo-img {
  width: 100%;
  max-width: 80px;
  object-fit: cover;
}
</style>
