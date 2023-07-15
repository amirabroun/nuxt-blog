<template>
  <client-only>
    <div>
      <div class="d-flex justify-content  header-layout">
        <v-avatar>
          <NuxtLink v-if="authUser">
            <img :src="authUser.avatar" width="40" height="40" style="padding: auto; border-radius: 10px; margin-top: 6px;"
              @error="handleImageError" />
          </NuxtLink>
          <NuxtLink v-else>
            <img src="@/assets/images/avatar.png" width="40" height="40" style="border-radius: 10px; margin-top: 6px;" />
          </NuxtLink>
          <v-menu activator="parent">
            <v-list>
              <v-list-item :to="`/users/${authUser.uuid}/resume`">
                <v-list-item-title class="text-black">
                  <v-icon size="small" class="mr-2">
                    <font-awesome-icon icon="fa-solid fa-user" /></v-icon>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title class="text-red">
                  <v-icon size="small" class="mr-2">
                    <font-awesome-icon icon="fa-solid fa-right-from-bracket" /></v-icon>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-avatar>
        <NuxtLink to="/" style="color: #3573fd; text-decoration: none; margin-left: 20px; margin-top: 10px;">Personal Blog</NuxtLink>
        <NuxtLink v-if="!authUser" to="/login"
          style="text-decoration: none; color: black; margin-top: 10px; margin-left: 1%;">Login</NuxtLink>
        <div v-if="!authUser" style="margin-top: 10px; margin-left: 6px; margin-right: 6px;">
          |
        </div>
        <NuxtLink v-if="!authUser" to="/register" style="text-decoration: none; color: black; margin-top: 10px;">Register
        </NuxtLink>
      </div>
      <slot />
    </div>
  </client-only>
</template>
<script lang="ts" setup>
import { faMousePointer } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "vue3-cookies";
import { Status, store } from "~/store";
import { AuthActionTypes } from "~/store/auth/action-types";
import { UserActionTypes } from "~/store/user/action-types";
const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();
const authUser = computed(() => store.state.auth?.authUser);
const isLoggedIn = computed(() => store.getters["auth/isAuth"]);
const loggingOut = computed(() => store.state.auth?.loggingOut);
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
.header-layout {
  padding: 10px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.11);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: linear-gradient(to left, #3573fd, #E4E5E6);
  box-shadow: 0 0rem 1rem 1rem #c9d9ff;
}
</style>
