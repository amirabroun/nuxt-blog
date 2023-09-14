<template>
  <client-only>
    <div class="d-flex justify-content p-2 shadow-lg">
      <v-avatar>
        <NuxtLink v-if="authUser && authUser.avatar != null">
          <img :src="authUser.avatar" width="40" height="40" style="padding: auto; border-radius: 10px; margin-top: 6px;"
            @error="handleImageError" />
        </NuxtLink>
        <NuxtLink v-else>
          <img src="@/assets/images/avatar.png" width="40" height="40" style="border-radius: 10px; margin-top: 6px;" />
        </NuxtLink>
        <v-menu activator="parent">
          <v-list>
            <v-list-item :to="`/users/${authUser?.uuid}/resume`">
              <v-list-item-title class="text-black">
                <v-icon size="small" class="mr-2">
                  <font-awesome-icon icon="fa-solid fa-user" /></v-icon>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title class="text-red">
                <v-icon size="small" class="mr-2"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-avatar>

      <NuxtLink class="text-primary m-2 ml-5" to="/">Blog</NuxtLink>
      <NuxtLink v-if="!authUser" to="/login" class="m-2 text-dark">Login</NuxtLink>
      <div v-if="!authUser" class="mt-2 text-dark"> | </div>
      <NuxtLink v-if="!authUser" to="/register" class="mt-2 ml-2 text-dark">Register</NuxtLink>
      <NuxtLink v-if="authUser && authUser.is_admin == true" to="/users" class="mt-2 ml-2 text-dark">Users</NuxtLink>

    </div>
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
  font-family: 'ubuntu', sans-serif;
  background: linear-gradient(to left, #00416A, #E4E5E6);
}

a {
  text-decoration: none
}
</style>
