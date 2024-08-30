<template>
  <v-row justify="space-around" class="mt-10">
    <v-col v-if="authUser" md="2" class="d-none d-md-block">
      <index-quick-access />
    </v-col>

    <v-col md="6">
      <v-card variant="text">
        <v-timeline side="end">
          <v-timeline-item
            v-for="notification in notifications"
            :key="notification.id"
            dot-color="light"
            icon-color="dark"
            icon="mdi-account"
            rounded="lg"
          >
            {{ notification.text }}
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-col>

    <v-col cols="4">
      <v-card class="pa-3">
        <v-row>
          <v-col cols="3" lg="3" md="3">
            <img
              :src="authUser?.avatar"
              v-if="authUser?.avatar"
              width="100"
              class="rounded-lg w-100"
            />
            <img
              src="@/assets/images/avatar.png"
              v-else
              width="100"
              class="rounded-lg w-100"
            />
          </v-col>

          <v-col cols="9" lg="9" md="9" class="mt-3">
            {{ authUser?.full_name }}
            <nuxt-link
              width="80px"
              height="25px"
              v-if="authUser && authUser.uuid == authUser?.uuid"
              :to="`/users/${authUser.uuid}/edit`"
              class="edit-link"
            >
              Edit
            </nuxt-link>
            <div class="mt-3" style="font-size: 20px">
              {{ authUser?.username }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

  
<script lang="ts" setup>
import { store } from "~/store";

const authUser = computed(() => store.state.auth?.authUser);
const notifications = computed(() => store.state.user?.notifications);

store.dispatch(`user/fetchNotifications`, authUser.value?.uuid);
</script>
