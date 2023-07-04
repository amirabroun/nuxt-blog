<template>
  <client-only>
    <div>
      <div class="d-flex justify-space-between align-center header-layout">
        <div class="title">Personal Blog</div>
        <div>
          <NuxtLink
            to="/"
            style="text-decoration: none; color: black"
            class="mr-4"
            >Home</NuxtLink
          >
          <NuxtLink
            v-if="authUser"
            :to="`/users/${authUser.uuid}/resume`"
            style="text-decoration: none; color: black"
            class="mr-4"
            >My Resume</NuxtLink
          >
          <v-avatar
            size="52"
            v-if="isLoggedIn && authUser"
            style="cursor: pointer"
            ><img
              v-if="authUser"
              :src="authUser.avatar"
              width="52"
              height="52"
              @error="handleImageError"
            />
            <img
              v-else
              src="@/assets/images/avatar.png"
              width="52"
              height="52"
            />
            <v-menu activator="parent">
              <v-list>
                <v-list-item :to="`/users/${authUser.uuid}/settings`">
                  <v-list-item-title class="text-black"
                    ><v-icon size="small" class="mr-2">
                      <font-awesome-icon icon="fa-solid fa-user" /></v-icon
                    >Profile</v-list-item-title
                  >
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title class="text-red"
                    ><v-icon size="small" class="mr-2">
                      <font-awesome-icon
                        icon="fa-solid fa-right-from-bracket" /></v-icon
                    >Logout</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu></v-avatar
          >
          <NuxtLink
            v-else
            to="/login"
            style="text-decoration: none; color: black"
            >Login/Register</NuxtLink
          >
        </div>
      </div>
      <slot />
    </div>
  </client-only>
</template>
<script lang="ts" setup>
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
@font-face {
  font-family: "Aladin";
  src: url("@/assets/fonts/Aladin-Regular.ttf") format("truetype");
}
.header-layout {
  padding: 20px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.11);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: white;
  .title {
    font-family: "Aladin";
    font-size: 36px;
    color: #3573fd;
  }
}
</style>
