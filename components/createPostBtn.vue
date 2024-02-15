<template>
  <VBtn
    v-if="isAuthUser"
    fab
    dark
    color="info"
    :to="'/posts/create'"
    class="text-white bg-info fixed-bottom-right btn"
  >
    <VIcon>mdi-plus</VIcon>
  </VBtn>
</template>

<script setup lang="ts">
const props = defineProps(["isAuth"]);
const isAuthUser = props.isAuth;
</script>
