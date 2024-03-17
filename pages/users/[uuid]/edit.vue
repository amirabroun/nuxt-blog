<template>
  <v-row class="mt-16" justify="center">
    <v-card class="px-4 py-3 d-lg-flex text-center" width="650">
      <v-avatar class="elevation-5 mb-4 mr-4" size="260" rounded="lg">
        <img class="w-100" v-if="authUser?.avatar" :src="authUser?.avatar" />
        <img class="w-100" v-else src="@/assets/images/avatar.png" />
        <v-btn
          variant="tonal"
          position="absolute"
          size="100"
          color="info"
          rounded="circle"
          v-if="!authUser?.avatar"
          @click="file.click()"
        >
          <v-file-input
            accept="image/*"
            type="file"
            class="d-none"
            ref="file"
            @change="uploadAvatar()"
          />
          <v-icon color="info" size="50px">mdi-camera-outline</v-icon>
        </v-btn>
        <v-btn
          v-else
          variant="tonal"
          position="absolute"
          size="100"
          color="danger"
          rounded="circle"
          @click="removeAvatar()"
        >
          <v-icon color="danger" icon="mdi-delete" size="50px" />
        </v-btn>
      </v-avatar>

      <v-row>
        <v-col cols="12" style="height: 60px">
          <v-text-field
            :rules="stringRules"
            v-model="firstName"
            label="first name"
            variant="solo-filled"
          />
        </v-col>
        <v-col cols="12" style="height: 60px">
          <v-text-field
            :rules="stringRules"
            v-model="lastName"
            label="last name"
            variant="solo-filled"
          />
        </v-col>
        <v-col cols="12" style="height: 60px">
          <v-text-field
            v-model="username"
            :rules="stringRules"
            @input="searchHandler"
            label="username"
            variant="solo-filled"
          />
        </v-col>
        <v-card-actions class="ml-auto" style="height: 60px">
          <v-btn
            type="submit"
            color="primary"
            @click="submitForm()"
            variant="tonal"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
  </v-row>
</template>

<script setup lang="ts">
import { store } from "~/store";
import { AuthActionTypes } from "~/store/auth/action-types";
import {
  addUserAvatar,
  checkUniqueUsername,
  deleteUserAvatar,
  updateUserProfile,
} from "~/store/user/actions";

const authUser = computed(() => store.state.auth?.authUser);

const firstName = ref(<string>authUser.value?.first_name);
const lastName = ref(<string>authUser.value?.last_name);
const username = ref(<string>authUser.value?.username);
const file = ref();

function searchHandler() {
  let timeout: any = null;
  if (username.value == "") return;
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    checkUniqueUsername(authUser.value?.uuid, username.value);
  }, 1500);
}

const stringRules = ref([
  (value: string) => !!value.trim() || "Required",
  (value: string) =>
    (value && value.length >= 3) || "Cannot have less than 3 letters",
  (value: string) =>
    (value && value.length <= 15) || "Cannot have more than 15 letters",
]);

async function uploadAvatar() {
  let formData = new FormData();
  formData.append("avatar", file.value.files[0]);

  await addUserAvatar(authUser.value?.uuid, formData);

  await store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
}

async function removeAvatar() {
  await deleteUserAvatar(authUser.value?.uuid);

  await store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
}

async function submitForm() {
  await updateUserProfile(
    authUser.value?.uuid,
    firstName.value,
    lastName.value,
    username.value
  );

  await store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
}
</script>
