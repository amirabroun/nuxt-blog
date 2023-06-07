<template>
  <div class="d-flex justify-center align-center" style="height: 100vh">
    <div class="mx-auto" style="width: 300px">
      <v-card class="pa-6">
        <v-card-title primary-title> Login </v-card-title>
        <v-form ref="formRef">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            variant="outlined"
            density="compact"
            required
            class="my-2"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            variant="outlined"
            density="compact"
            required
            class="my-2"
          ></v-text-field>
          <div class="d-flex flex-column mb-4">
            <v-btn color="success" class="mt-4" block @click="login">
              login
            </v-btn>

            <v-btn color="error" class="mt-4" block @click="logout">
              logout</v-btn
            >
          </div>
          <a href="/register">don't have an account? Register here</a>
        </v-form>
      </v-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { store, RootState, Status } from "@/store";
import { AuthActionTypes } from "~/store/auth/action-types";
const valid = ref<boolean>(true);
const email = ref<string>();
const password = ref<string>();
const formRef = ref();
const emailRules = [
  (v: any) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Email must be valid",
];
const passwordRules = [
  (value: any) => {
    if (value) return true;

    return "Password is requred.";
  },
];
const login = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    store.dispatch(`auth/${AuthActionTypes.login}`, {
      email: email.value,
      password: password.value,
    });
  }
};
const logout = async () => {
  store.dispatch(`auth/${AuthActionTypes.logOut}`);
};
const reset = () => {
  formRef.value.reset();
};
const resetValidation = () => {
  formRef.value.resetValidation();
};
</script>
