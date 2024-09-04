<template>
  <v-card rounded="lg" color="info" style="height: 100%">
    <v-row class="px-10 py-2" style="height: 100%">
      <v-col cols="12">
        <nuxt-link to="/" style="font-size: 70px; color: white">
          Blog
        </nuxt-link>
        <p>Start your journey with us.</p>
      </v-col>

      <v-col cols="12" class="mt-auto">
        <v-card color="info" class="py-1 text-center" rounded="lg">
          <v-avatar rounded="lg" size="300">
            <img src="@/assets/images/guys.jpg" class="rounded-lg w-100" />
          </v-avatar>
          <p>
            Unlock the power of creating resumes, writing posts, and connecting
            with others in our vibrant blog community.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
