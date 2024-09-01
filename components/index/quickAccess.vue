<template>
  <v-card variant="text" position="fixed" class="mt-10">
    <v-card-text>
      <v-timeline density="compact" line-inset="4">
        <v-timeline-item
          v-for="(item, index) in timelineItems"
          :key="index"
          :dot-color="route === item.route ? 'primary' : 'light'"
          :elevation="route === item.route ? 10 : 0"
          :icon="item.icon"
        >
          <nuxt-link class="text-black" :to="item.link" :text="item.text" />
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { store } from "~/store";

const route = useRoute().name;

const authUser = computed(() => store.state.auth?.authUser);

const timelineItems = computed(() => [
  {
    route: "index",
    link: "/",
    text: "Home",
    icon: "mdi-home-outline",
  },
  {
    route: "users-uuid-profile",
    link: `/users/${authUser?.value?.uuid}/profile`,
    text: "Account",
    icon: "mdi-account-outline",
  },
  {
    route: "users-uuid-resume",
    link: `/users/${authUser?.value?.uuid}/resume`,
    text: "Resume",
    icon: "mdi-badge-account",
  },
  {
    route: "users-uuid-notifications",
    link: `/users/${authUser?.value?.uuid}/notifications`,
    text: "Notifications",
    icon: "mdi-bell-outline",
  },
]);
</script>
