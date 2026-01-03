<template>
  <form @submit.prevent="submitForm" class="flex-col flex gap-5 w-11/12">
    <FwbInput
      id="email"
      name="email"
      label="Email / Usuario"
      placeholder="Tu email o usuario"
      :error="identifierError"
      autocomplete="email"
      v-model="identifier"
    >
      <template #suffix>
        <span class="pi pi-at"></span>
      </template>
      <template #validationMessage>
        <span class="font-medium">{{ identifierError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      id="password"
      name="password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Tu contraseña"
      :error="passwordError"
      v-model="password"
    >
      <template #suffix>
        <span
          v-if="!showPassword"
          @click="changeShowPassword(true)"
          class="pi pi-eye hover:text-blue-600"
        ></span>
        <span
          v-else
          @click="changeShowPassword(false)"
          class="pi pi-eye-slash hover:text-blue-600"
        ></span>
      </template>
      <template #validationMessage>
        <span class="font-medium">{{ passwordError }}</span>
      </template>
    </FwbInput>

    <div class="flex items-center gap-2">
      <FwbCheckbox
        id="keepSignedIn"
        v-model="rememberMe"
        label="Keep me signed in"
      />
    </div>

    <FwbButton :disabled="isPending">Log In</FwbButton>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FwbButton, FwbCheckbox, FwbInput } from "flowbite-vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { UseLogin } from "../../composables/useLogin";
import type { LoginDto } from "../../type/AuthDto";

const showPassword = ref(false);
const rememberMe = ref(false);
function changeShowPassword(show: boolean) {
  showPassword.value = show;
}
const schema = yup.object({
  identifier: yup.string().required("El usuario o email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const { handleSubmit } = useForm<LoginDto>({
  validationSchema: schema,
});

const { value: identifier, errorMessage: identifierError } =
  useField<LoginDto["identifier"]>("identifier");
const { value: password, errorMessage: passwordError } =
  useField<LoginDto["password"]>("password");

const { mutate, isPending } = UseLogin();

const router = useRouter();

const submitForm = handleSubmit((values: LoginDto) => {
  mutate(values, {
    onSuccess: () => {
      localStorage.setItem("rememberMe", rememberMe.value ? "true" : "false");
      router.replace({ name: "home" });
    },
  });
});
</script>
