<template>
  <ClientOnly>
    <div
      class="d-flex justify-center align-center"
      style="
        height: 100vh;
        overflow: hidden;
        min-height: -webkit-fill-available;
      "
    >
      <v-row class="pa-md-9" style="height: 100%">
        <v-col
          class="d-none d-md-block"
          cols="4"
          style="background: #3573fd; border-radius: 16px; color: white"
        >
          <login-slogan />
        </v-col>
        <v-col cols="12" md="8" style="overflow: hidden"
          ><div
            class="d-md-none"
            style="
              position: relative;
              top: 0;
              padding: 16px 0;
              left: 12px;
              color: black;
              width: 100%;
              background: white;
            "
          >
            <NuxtLink
              to="/"
              style="text-decoration: none; color: black; opacity: 60%"
              ><v-icon size="small">
                <font-awesome-icon icon="fa-solid fa-chevron-left" /></v-icon
              >Home</NuxtLink
            >
          </div>
          <v-row justify="center" style="height: 100%"
            ><v-col
              cols="10"
              class="d-block d-md-flex"
              style="
                height: 100%;
                flex-direction: column;
                justify-content: space-around;
              "
            >
              <div>
                <div>
                  <div
                    style="
                      font-style: normal;
                      font-weight: 700;
                      font-size: 40px;
                    "
                  >
                    Register
                  </div>
                  <div
                    style=" normal;
font-weight: 400;
font-size: 20px;"
                  >
                    Have an account?
                    <NuxtLink
                      to="/login"
                      style="color: #1167e4; text-decoration: none"
                      >Login</NuxtLink
                    >
                  </div>
                </div>
                <div style="margin-top: 44px">
                  <v-form ref="formRef">
                    <label
                      style="
                        margin-bottom: 14px;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 24px;
                        opacity: 60%;
                      "
                      >Username</label
                    >
                    <v-text-field
                      v-model="username"
                      :rules="usernameRules"
                      required
                      style="margin-top: 14px"
                      variant="outlined"
                      color="#1167E4"
                      placeholder="Example@hotmail.com"
                    />
                    <label
                      style="
                margin-bottom: 14px;margin-top: 30px
                font-style: normal;
                font-weight: 400;
                font-size: 24px;
                opacity: 60%;
              "
                      >Password</label
                    >
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      required
                      style="margin-top: 14px"
                      variant="outlined"
                      placeholder="****"
                      :append-inner-icon="
                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="showPassword ? 'text' : 'password'"
                      @click:append-inner="showPassword = !showPassword"
                      color="#1167E4"
                    />
                    <label
                      style="
                margin-bottom: 14px;margin-top: 30px
                font-style: normal;
                font-weight: 400;
                font-size: 24px;
                opacity: 60%;
              "
                      >Confirm Password</label
                    >
                    <v-text-field
                      v-model="password_confirmation"
                      :rules="confirmPasswordRules"
                      required
                      style="margin-top: 14px"
                      variant="outlined"
                      placeholder="****"
                      :append-inner-icon="
                        showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="showConfirmPassword ? 'text' : 'password'"
                      @click:append-inner="
                        showConfirmPassword = !showConfirmPassword
                      "
                      color="#1167E4"
                    />
                  </v-form>
                </div>
              </div>
              <div class="d-none d-md-block">
                <v-btn
                  @click="register"
                  style="
                    height: 60px;
                    border-radius: 16px;
                    color: white;
                    padding-inline: 69px;
                  "
                  color="#1167E4
"
                  :loading="loading"
                >
                  Register
                </v-btn>
              </div>
              <div
                class="d-md-none d-flex"
                style="
                  position: fixed;
                  bottom: 12px;
                  width: 94%;
                  left: 0;
                  margin: 12px;
                  display: flex;
                  justify-content: center;
                "
              >
                <v-btn
                  @click="register"
                  style="
                    height: 60px;
                    border-radius: 16px;
                    color: white;
                    padding-inline: 69px;
                    width: 90%;
                  "
                  color="#1167E4
"
                  :loading="loading"
                >
                  Register
                </v-btn>
              </div></v-col
            ></v-row
          >
        </v-col>
      </v-row>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { store, RootState, Status } from "@/store";
import { AuthActionTypes } from "~/store/auth/action-types";
import LoginSlogan from "./components/LoginSlogan.vue";
definePageMeta({
  layout: false,
});
const router = useRouter();
const valid = ref<boolean>(true);
const username = ref<string>();
const password = ref<string>();
const password_confirmation = ref<string>();
const formRef = ref();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = computed(() => store.state.auth?.isLoggingIn);
const registerStatus = computed(() => store.state.auth?.status);
const usernameRules = [(v: any) => !!v || "Username is required"];
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
      username: username.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
  }
};
const getUser = async () => {
  store.dispatch(`auth/${AuthActionTypes.fetchAuthUser}`);
};
const reset = () => {
  formRef.value.reset();
};
const resetValidation = () => {
  formRef.value.resetValidation();
};
watch(
  () => registerStatus.value,
  () => {
    if (registerStatus.value == Status.success) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }
);
</script>
