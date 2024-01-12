<template>
  <client-only>
    <VContainer class="py-1 elevation-4 rounded-b-lg navbar" fluid>
      <VRow justify="space-between" align="center" class="pr-10">
        <VCol cols="auto">
          <NuxtLink to="/" class="logo-link">
            <img src="@/assets/images/logo-e-blog.png" class="logo-img" />
          </NuxtLink>
        </VCol>
        <VCol cols="auto mt-1" v-if="authUser">
          <span class="pl-4 pr-8 bg-white rounded-lg username-box" style="cursor: pointer;">
            {{ authUser.full_name }}
          </span>
          <VAvatar size="45" class="navbar-avatar relative ">
            <NuxtLink v-if="authUser.avatar != null">
              <img :src="authUser.avatar" class="avatar-img rounded-lg" @error="handleImageError" />
            </NuxtLink>
            <NuxtLink v-else>
              <img src="@/assets/images/avatar.png" class="avatar-img rounded-lg" />
            </NuxtLink>
          </VAvatar>
          <VMenu activator="parent">
            <VList>
              <VListItem :to="`/users/${authUser?.uuid}`">
                <VListItemTitle class="text-black">
                  <VIcon class="mr-4"> mdi-account</VIcon>Profile
                </VListItemTitle>
              </VListItem>
              <VListItem :to="`/users/${authUser?.uuid}/resume`">
                <VListItemTitle class="text-info">
                  <VIcon class="mr-4"> mdi-badge-account</VIcon>Resume
                </VListItemTitle>
              </VListItem>
              <VListItem @click="logout">
                <VListItemTitle class="text-red">
                  <VIcon class="mr-4">mdi-logout /></VIcon>
                  Logout
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VCol>
        <VCol cols="auto" v-if="!authUser">
          <NuxtLink to="/login" class="navbar-link">Sign In</NuxtLink>
          <NuxtLink to="/register" class="signUp-link navbar-link ml-4 py-2 px-4 rounded-lg">Sign Up</NuxtLink>
        </VCol>
      </VRow>
    </VContainer>
    <VContainer fluid class="mt-12">
      <slot />
    </VContainer>
  </client-only>
</template>
<script lang="ts" setup>
import { Status, store } from "~/store";
import { useCookies } from "vue3-cookies";
import { AuthActionTypes } from "~/store/auth/action-types";
const router = useRouter();
const authUser = computed(() => store.state.auth?.authUser);
const loggingOutStatus = computed(() => store.state.auth?.loggingOutStatus);

watch(
  () => loggingOutStatus.value,
  () => {
    if (loggingOutStatus.value == Status.success) {
      router.push("/");
    }
  }
);
const { cookies } = useCookies();
onMounted(() => {
  if (cookies.get("theUserToken") != null)
    store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
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
  width: 90%;
}

.navbar-avatar {
  left: -20px;
  border-radius: 0px !important;
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

.navbar {
  position: fixed;
  top: 0;
  z-index: 9;
  background: linear-gradient(to left, #00416a, #e4e5e6);
}

.navbar-link {
  color: #fff;
}

.signUp-link {
  border: 1px solid;
}

.username-box {
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 0.9rem;
  background: linear-gradient(to left, #00416ac2, #71a9e075);
}
</style>
