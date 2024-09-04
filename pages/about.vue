<template>
  <v-row justify="space-around" class="mt-10">
    <v-col md="8" sm="12">
      <v-card color="bluewhite">
        <v-row class="px-2 py-8" justify="center">
          <v-avatar
            rounded="lg"
            style="border-top: solid #3573fd; border-radius: 8px"
            size="300"
          >
            <img
              src="@/assets/images/amirabroun.jpg"
              class="rounded-lg mt-4 w-100"
            />
          </v-avatar>
          <v-col cols="12" md="8" class="py-2 px-6">
            <h2>About Me</h2>
            <p class="mt-2">
              Hello! I’m [Your Name], the creator of this blog. I’m passionate
              about technology, development, and sharing knowledge with others.
              I created this space to share insights, stories, and experiences
              that I hope will inspire and inform fellow developers and
              enthusiasts.
            </p>
            <p>
              This blog is built using cutting-edge technologies to ensure a
              seamless and robust experience:
            </p>

            <h3 class="mt-6">Major Projects</h3>
            <div class="mt-4">
              <v-icon class="mr-2">mdi-laravel</v-icon>
              <nuxt-link
                to="https://github.com/amirabroun/laravel-blog"
                class="text-primary"
              >
                Laravel blog on github
              </nuxt-link>
              - Back end for this blog based on api.
            </div>
            <div class="mt-4">
              <v-icon class="mr-2">mdi-nuxt</v-icon>
              <nuxt-link
                to="https://github.com/amirabroun/nuxt-blog"
                class="text-primary"
              >
                Nuxt blog
              </nuxt-link>
              - Front of based vue.
            </div>
            <div class="mt-4">
              <v-icon class="mr-2">mdi-docker</v-icon>
              <nuxt-link
                to="https://github.com/amirabroun/database-container"
                class="text-primary"
              >
                Database container
              </nuxt-link>
              -
              <nuxt-link
                to="https://github.com/amirabroun/php-container"
                class="text-primary"
              >
                Php container
              </nuxt-link>
            </div>
            <p class="mt-2">
              - As i'm intrested of docker all my projects has each container
              for theirself.
            </p>
          </v-col>
        </v-row>
        <v-row class="px-10 mb-2">
          <v-col md="4" sm="12" order-md="last" >
            <img
              src="@/assets/images/amir-in-uni.jpg"
              class="rounded-lg mt-4 w-100"
            />
          </v-col>
          <v-col md="8" sm="12" order-md="frist" >
            <p>
              Experienced Software Developer with over 3 years of experience in
              Web Development. Results-focused software engineering professional
              with extensive experience in development and testing. Well-versed
              in promoting objective-oriented approaches to real-time software
              development. Analytical and detail-oriented.
            </p>
            <br />
            <p>
              Experienced Software Developer with over 3 years of experience in
              Web Development. Results-focused software engineering professional
              with extensive experience in development and testing. Well-versed
              in promoting objective-oriented approaches to real-time software
              development. Analytical and detail-oriented.
            </p>
          </v-col>
        </v-row>
        <v-row class="px-10 mb-2 mt-5" justify="space-between">
          <v-col class="text-center">
            <img
              src="@/assets/images/amir-in-lug-docker.jpg"
              class="rounded-lg mt-4 w-50"
            />
            <p class="text-left mt-6">
              SCLUG is the Linux User Group for Berkshire. Founded in June 1995
              by a group of Linux enthusiasts, we exist to support users of
              Linux-based operating systems in Reading, Maidenhead, Slough,
              Bracknell, Windsor, Newbury, and the surrounding areas, and to
              provide a forum for the free software community of this region.
              Whether you're new to Linux or a seasoned expert, this group will
              hopefully be of interest to you.
            </p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
