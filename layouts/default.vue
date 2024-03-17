<template>
  <client-only>
    <v-container class="py-1 elevation-4 rounded-b-lg navbar" fluid>
      <v-row justify="space-between" align="center" class="pr-10">
        <v-col cols="auto">
          <nuxt-link to="/" class="logo-link">
            <img src="@/assets/images/logo-e-blog.png" width="80" />
          </nuxt-link>
        </v-col>
        <v-col cols="auto" v-if="authUser">
          <span
            class="pl-4 pr-8 py-1 rounded-lg"
            style="
              cursor: pointer;
              font-size: 0.9rem;
              background: linear-gradient(to right, #2aa4e1, #00417a);
            "
          >
            {{ authUser.full_name }}
          </span>
          <v-avatar size="50" rounded="lg" style="left: -20px; cursor: pointer">
            <img v-if="authUser.avatar" :src="authUser.avatar" class="w-100" />
            <img v-else src="@/assets/images/avatar.png" class="w-100" />
          </v-avatar>
          <v-menu activator="parent">
            <v-list>
              <v-list-item :to="`/users/${authUser?.uuid}`">
                <v-list-item-title class="text-black">
                  <v-Icon class="mr-4"> mdi-account</v-Icon>Profile
                  <nuxt-link
                    width="80px"
                    height="25px"
                    v-if="authUser"
                    :to="`/users/${authUser.uuid}/edit`"
                    class="edit-link"
                  >
                    Edit
                  </nuxt-link>
                </v-list-item-title>
              </v-list-item>
              <v-list-item :to="`/users/${authUser?.uuid}/resume`">
                <v-list-item-title class="text-info">
                  <v-Icon class="mr-4"> mdi-badge-account</v-Icon>Resume
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title class="text-red">
                  <v-Icon class="mr-4">mdi-logout /></v-Icon>
                  Logout
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="auto" v-if="!authUser">
          <nuxt-link to="/login" class="text-white"> Sign In </nuxt-link>
          <nuxt-link
            to="/register"
            style="border: 1px solid"
            class="text-white ml-4 py-2 px-4 rounded-lg"
          >
            Sign Up
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <slot />
      <create-post-btn v-if="route.name != 'posts-create'" />
    </v-container>
  </client-only>
</template>
<script lang="ts" setup>
import { Status, store } from "~/store";
import { AuthActionTypes } from "~/store/auth/action-types";
const authUser = computed(() => store.state.auth?.authUser);
const loggingOutStatus = computed(() => store.state.auth?.loggingOutStatus);
const route = useRoute();

watch(
  () => loggingOutStatus.value,
  () => {
    if (loggingOutStatus.value == Status.success) {
      navigateTo("/");
    }
  }
);

const logout = async () => {
  store.dispatch(`auth/${AuthActionTypes.logOut}`);
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

.logo-link {
  width: 80px;
  height: 50px;
  display: flex;
  align-items: center;
}

.navbar {
  position: fixed;
  z-index: 9;
  background: linear-gradient(to left, #00416a, #e4e5e6);
}

.edit-link {
  background-color: #0c356a;
  color: #fff;
  font-size: 0.9rem;
  padding: 5px 15px;
  border-radius: 10px;
  margin-left: 60px;
}
</style>
