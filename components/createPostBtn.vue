<template>
  <v-btn
    v-if="isAuthUser"
    :to="'/posts/create'"
    color="info"
    size="60"
    class="btn"
    position="fixed"
    icon="mdi-plus"
    rounded="circle"
  />
</template>

<script setup lang="ts">
import { store } from "~/store";

const isAuthUser = store.getters["auth/getAuthUser"];
</script>

<style>
.btn {
  bottom: 30px;
  right: 30px;
}
</style>