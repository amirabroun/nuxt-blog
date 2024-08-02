<template>
  <v-card variant="text" position="fixed" class="mt-10">
    <v-card-text>
      <v-timeline density="compact" line-inset="4">
        <v-timeline-item
          :dot-color="route === 'index' ? 'primary' : 'light'"
          :icon-color="route === 'index' ? 'light' : 'dark'"
          :elevation="route === 'index' ? 10 : 0"
          icon="mdi-home"
          rounded="lg"
        >
          <nuxt-link class="text-black" :to="`/`" text="Home" />
        </v-timeline-item>

        <v-timeline-item
          :dot-color="route === 'users-uuid-profile' ? 'primary' : 'light'"
          :icon-color="route === 'users-uuid-profile' ? 'light' : 'dark'"
          :elevation="route === 'users-uuid-profile' ? 10 : 0"
          icon="mdi-account"
          rounded="lg"
        >
          <nuxt-link
            class="text-black"
            :to="`/users/${authUser?.uuid}/profile`"
            text="Account"
          />
        </v-timeline-item>

        <v-timeline-item
          dot-color="light"
          icon-color="dark"
          :elevation="route === 'notifications' ? 10 : 0"
          icon="mdi-alarm-light"
          rounded="lg"
        >
          <nuxt-link class="text-black" to="/" text="Notifications" />
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
  
<script lang="ts" setup>
import { store } from "~/store";

const route = useRoute().name;
const authUser = computed(() => store.state.auth?.authUser);
</script>
