<template>
  <v-container>
    <v-row>
      <v-col lg="8" cols="12" class="mx-auto">
        <v-card class="px-2 py-8 d-flex align-center">
          <v-row>
            <v-col>
              <div class="d-flex img-box overflow-hidden mx-auto">
                <img v-if="authUser?.avatar" :src="authUser?.avatar" />
                <img v-else src="@/assets/images/avatar.png" />
                <div
                  class="camera-icon-box d-flex align-center justify-center"
                  @click="fileInput.click()"
                >
                  <div
                    class="d-flex flex-column justify-center align-center"
                    v-if="!authUser?.avatar"
                  >
                    <v-icon color="blue" size="50px">mdi-camera-outline</v-icon>
                    <p class="text">Add Avatar</p>
                  </div>
                  <div
                    class="d-flex flex-column justify-center align-center"
                    v-else
                    @click="removeAvatar()"
                  >
                    <v-icon color="red" size="50px">mdi-delete-outline</v-icon>
                    <p class="text">Delete Avatar</p>
                  </div>
                </div>
                <VFileInput
                  accept="image/*"
                  type="file"
                  class="d-none"
                  ref="fileInput"
                  @change="uploadAvatar()"
                />
              </div>
            </v-col>
            <form ref="form" @submit.prevent="submitForm()" class="mx-auto">
              <div class="my-2">
                <v-text-field
                  class="mr-10"
                  :rules="firstNameRules"
                  v-model="firstName"
                  label="first name"
                  variant="solo-filled"
                  ref="firstNameInput"
                />
              </div>
              <div class="my-2">
                <v-text-field
                  class="mr-10"
                  :rules="lastNameRules"
                  v-model="lastName"
                  label="last name"
                  variant="solo-filled"
                  ref="lastNameInput"
                />
              </div>
              <div class="my-2">
                <v-text-field
                  class="mr-10"
                  v-model="username"
                  @input="searchHandler"
                  label="username"
                  variant="solo-filled"
                  ref="usernameInput"
                />
              </div>
              <v-btn
                type="submit"
                class="py-1 border"
                color="info"
                variant="outlined"
              >
                Update
              </v-btn>
            </form>
          </v-row>
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

const form = ref();
const firstNameInput = ref();
const lastNameInput = ref();
const fileInput = ref();
const usernameInput: Ref<string> = ref("");

const firstName = ref(<string>authUser.value?.first_name);
const lastName = ref(<string>authUser.value?.last_name);
const username = ref(<string>authUser.value?.username);

let timeout: any = null;

function searchHandler() {
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

<style scoped>
form {
  width: 60%;
}

.img-box {
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border-radius: 20%;
  width: max-content;
}

.img-box > img {
  width: 250px;
}

.camera-icon-box {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20%;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

#btn {
  border: thin solid #00416a;
}
.text {
  color: white;
  font-size: 1.2rem;
}

.search-input {
  font-size: 1.2rem;
  outline: none;
  border: 1px solid;
  border-radius: 5px;
}
</style>
