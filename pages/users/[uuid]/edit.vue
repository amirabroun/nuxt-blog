<template>
  <v-container>
    <v-row>
      <v-col lg="8" cols="12" class="mx-auto">
        <v-card class="px-5 py-6 d-lg-flex text-center">
          <v-avatar class="elevation-4 mb-4 mr-4" size="260" rounded="lg">
            <img
              class="w-100"
              v-if="authUser?.avatar"
              :src="authUser?.avatar"
            />
            <img class="w-100" v-else src="@/assets/images/avatar.png" />
            <v-btn
              variant="tonal"
              position="absolute"
              size="100"
              color="info"
              rounded="circle"
              v-if="!authUser?.avatar"
              @click="fileInput.click()"
            >
              <VFileInput
                accept="image/*"
                type="file"
                class="d-none"
                ref="fileInput"
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
          <form class="mx-auto w-75">
            <v-text-field
              :rules="firstNameRules"
              v-model="firstName"
              label="first name"
              variant="solo-filled"
              ref="firstNameInput"
            />
            <v-text-field
              :rules="lastNameRules"
              v-model="lastName"
              label="last name"
              variant="solo-filled"
              ref="lastNameInput"
            />
            <v-text-field
              v-model="username"
              :rules="userNameRules"
              @input="searchHandler"
              label="username"
              variant="solo-filled"
              ref="usernameInput"
            />
            <v-card-actions>
              <v-btn
                type="submit"
                color="info"
                @click="submitForm()"
                variant="outlined"
              >
                Update
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
const route = useRoute();

const firstNameInput = ref();
const lastNameInput = ref();
const fileInput = ref();
const usernameInput: Ref<string> = ref("");

const firstName = ref(<string>authUser.value?.first_name);
const lastName = ref(<string>authUser.value?.last_name);
const username = ref(<string>authUser.value?.username);

let timeout: any = null;

function searchHandler() {
  if (username.value == "") return;
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    checkUniqueUsername(authUser.value?.uuid, username.value);
  }, 1500);
}

const firstNameRules = ref([
  (value: string) => !!value.trim() || "This field is required",
  (value: string) =>
    (value && value.length >= 3) ||
    "first Name cannot have less than 3 letters",
  (value: string) =>
    (value && value.length <= 20) ||
    "first Name cannot have more than 20 letters",
]);

const lastNameRules = ref([
  (value: string) => !!value.trim() || "This field is required",
  (value: string) =>
    (value && value.length >= 3) || "User Name cannot have less than 3 letters",
  (value: string) =>
    (value && value.length <= 15) ||
    "User Name cannot have more than 15 letters",
]);

const userNameRules = ref([
  (value: string) => !!value.trim() || "Required",
  (value: string) =>
    (value && value.length >= 3) || "User Name cannot have less than 3 letters",
  (value: string) =>
    (value && value.length <= 15) ||
    "User Name cannot have more than 15 letters",
]);

async function uploadAvatar() {
  let formData = new FormData();
  formData.append("avatar", fileInput.value.files[0]);

  await addUserAvatar(authUser.value?.uuid, formData);

  await store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
}

async function removeAvatar() {
  if (authUser.value?.uuid !== route.params.uuid) {
    return;
  }

  await deleteUserAvatar(authUser.value?.uuid);

  await store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
}

async function submitForm() {
  if (authUser.value?.uuid !== route.params.uuid) {
    return;
  }

  await updateUserProfile(
    authUser.value?.uuid,
    firstName.value,
    lastName.value,
    username.value
  );

  reloadNuxtApp({
    path: `/users/${authUser.value.uuid}`,
    force: true,
  });
}
</script>
