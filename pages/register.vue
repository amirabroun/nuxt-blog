<template>
  <div class="d-flex justify-center align-center" style="height: 100vh">
    <div class="mx-auto" style="width: 300px">
      <v-card class="pa-6">
        <v-card-title primary-title> Register </v-card-title>
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
          <v-text-field
            v-model="password_confirmation"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            variant="outlined"
            density="compact"
            required
            class="my-2"
          ></v-text-field>
          <div class="d-flex flex-column mb-4">
            <v-btn color="success" class="mt-4" block @click="register">
              Register
            </v-btn>

            <v-btn color="error" class="mt-4" block @click="getUserInfo">
              getUserInfo</v-btn
            >
          </div>
          <NuxtLink to="/login">have an account? Login here</NuxtLink>
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
const password_confirmation = ref<string>();
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
const confirmPasswordRules = [
  (value: any) => {
    if (value) return true;

    return "Confirmation Password is requred.";
  },
  (value: any) => {
    if (value == password.value) return true;
    return "Confirmation password doesn't match password";
  },
];
const register = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    store.dispatch(`auth/${AuthActionTypes.register}`, {
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
  }
};
const getUserInfo = async () => {
  store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
};
const reset = () => {
  formRef.value.reset();
};
const resetValidation = () => {
  formRef.value.resetValidation();
};
</script>
