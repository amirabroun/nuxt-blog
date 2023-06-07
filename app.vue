<template>
  <div>
    <v-snackbar
      elevation="0"
      v-model="toast.show"
      :timeout="toast.timeout"
      :color="toast.color === `success` ? `#43A047` : toast.color"
      transition="slide-y-reverse-transition"
      width="150px"
      bottom
    >
      <span class="d-flex align-center">
        <v-icon v-if="toast.color === `success`" class="ml-1 font-4">
          fas fa-check-circle
        </v-icon>
        <v-icon v-else-if="toast.color === `error`" class="ml-1 font-4">
          fas fa-times-circle
        </v-icon>
        <span
          class="font-weight-bold"
          style="font-size: 1.1rem; line-height: 16px"
        >
          {{ toast.message }}
        </span>
      </span>
      <template v-slot:actions>
        <v-btn
          text
          class="font-3"
          v-bind="attrs"
          @click.stop="toast.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <NuxtPage />
  </div>
</template>
<script lang="ts" setup>
import { store } from "./store";
const toast = computed(() => store.state.app?.toast);
</script>
