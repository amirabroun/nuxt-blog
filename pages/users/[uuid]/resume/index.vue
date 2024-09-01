<template>
  <v-row justify="space-around" class="mt-10">
    <v-col md="6" class="px-14">
      <v-card>
        <v-row class="my-2 px-2">
          <v-col md="5" cols="12">
            <v-card color="#202a30" class="px-6">
              <v-row class="my-4">
                <v-col
                  md="12"
                  cols="6"
                  class="pa-0"
                  style="border-top: 2px solid #3573fd; border-radius: 8px"
                  v-if="user?.avatar"
                >
                  <img
                    class="w-100"
                    :src="user?.avatar"
                    :alt="user?.full_name"
                    style="border-radius: 8px"
                  />
                </v-col>
                <v-col md="12" cols="6" class="pl-0">
                  <span class="text-info">{{ user?.full_name }}</span>
                  <br />
                  <span class="text-white">
                    {{ user?.resume?.experiences?.find(() => true)?.position }}
                  </span>
                </v-col>
                <v-col cols="12" class="contact pa-0 mt-4">
                  <div
                    class="items"
                    v-for="(item, index) in user?.resume?.contact"
                    :key="index"
                  >
                    <div class="item" v-if="item.title == 'phone'">
                      <span class="detail">
                        <v-icon class="mr-1 text-white">mdi-phone</v-icon>
                        {{ item.link }}
                      </span>
                    </div>
                    <div class="item" v-if="item.title == 'email'">
                      <span class="detail">
                        <v-icon class="mr-1 text-white">mdi-email</v-icon>
                        {{ item.link }}
                      </span>
                    </div>
                    <div class="item" v-if="item.title == 'address'">
                      <span class="detail">
                        <v-icon class="mr-1 text-white">mdi-home</v-icon>
                        {{ item.link }}
                      </span>
                    </div>
                    <div class="item" v-if="item.title == 'github'">
                      <nuxt-link class="detail" :href="item.link">
                        <v-icon class="mr-1 text-white">mdi-github</v-icon>
                        github
                      </nuxt-link>
                    </div>
                    <div class="item" v-if="item.title == 'linkedin'">
                      <nuxt-link class="detail" :href="item.link">
                        <v-icon class="mr-1 text-white">mdi-linkedin</v-icon>
                        linkedin
                      </nuxt-link>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="7" cols="12">
            <div class="d-flex align-center">
              About
              <v-divider class="ml-4" />
            </div>

            <p class="mt-2" style="font-size: 13px">
              {{ user?.resume?.summary }}
            </p>

            <div class="mt-4 d-flex align-center">
              Experience
              <v-divider class="ml-4" />
            </div>
            <div
              v-for="(job, index) in user?.resume?.experiences"
              :key="index"
              class="mt-4"
            >
              {{ job?.position }}
              <span class="text-info">@</span>
              {{ job?.company }}
              <p class="mt-2" style="font-size: 13px">
                {{ job?.description }}
              </p>
            </div>

            <div class="my-4 d-flex align-center">
              Skills
              <v-divider class="ml-4" />
            </div>
            <v-btn
              class="badge-sm mr-1 mb-1"
              variant="tonal"
              height="22px"
              size="small"
              v-for="(item, index) in user?.resume?.skills"
              :key="index"
            >
              {{ item.title }}
            </v-btn>

            <div class="my-4 d-flex align-center">
              Education
              <v-divider class="ml-4" />
            </div>
            <div
              md="12"
              cols="6"
              class="mt-3"
              v-for="(item, index) in user?.resume?.education"
              :key="index"
            >
              {{ item.field }}
              <span class="text-info">@</span>
              {{ item.university }} ( {{ item.location }} )
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { store } from "~/store";

const route = useRoute();
const user = computed(() => store.state.user?.user);

onMounted(() => {
  store.dispatch(`user/fetchUser`, route.params.uuid);
});
</script>
<style lang="scss">
.badge-sm {
  cursor: default;
}

.contact {
  .items {
    .item {
      .detail {
        font-size: 12px;
        color: whitesmoke;
      }
    }
  }
}
</style>
