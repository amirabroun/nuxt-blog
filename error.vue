<template>
  <div>
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-card class="w-50 text-center pa-6 pb-7 mx-auto">
        <v-card-text>
          <div>Ops! We have an error</div>
          <p class="text-h1 text--primary my-5">{{ error.statusCode }}</p>
          <div class="text--primary text-h6">
            {{ error.message }}
          </div>
        </v-card-text>
        <NuxtLink
          to="/"
          class="mx-auto"
          style="color: #0c356a; font-weight: 700; text-decoration: underline"
          >Home Page</NuxtLink
        >
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["error"]);
</script>
