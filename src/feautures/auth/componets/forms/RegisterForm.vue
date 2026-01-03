<template>
  <form @submit.prevent="submitForm" class="flex-col flex gap-5 w-11/12">
    <FwbInput
      label="Nombre completo"
      placeholder="Tu nombre"
      v-model="name"
      :error="nameError"
    >
      <template #validationMessage>
        <span class="font-medium">{{ nameError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      label="Email"
      placeholder="Tu email"
      v-model="email"
      :error="emailError"
    >
      <template #validationMessage>
        <span class="font-medium">{{ emailError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      label="Teléfono"
      placeholder="Tu teléfono"
      v-model="phone"
      :error="phoneError"
    >
      <template #validationMessage>
        <span class="font-medium">{{ phoneError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      label="Contraseña"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Tu contraseña"
      v-model="password"
      :error="passwordError"
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

    <FwbButton :disabled="isPending">Registrarse</FwbButton>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FwbButton, FwbInput } from "flowbite-vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { UseRegister } from "../../composables/useRegister"; 
import type { RegisterDto } from "../../type/AuthDto";

const showPassword = ref(false);
function changeShowPassword(show: boolean) {
  showPassword.value = show;
}

const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  phone: yup.string().required("El teléfono es obligatorio"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
});

const { handleSubmit } = useForm<RegisterDto>({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField<RegisterDto["name"]>("name");
const { value: email, errorMessage: emailError } = useField<RegisterDto["email"]>("email");
const { value: phone, errorMessage: phoneError } = useField<RegisterDto["phone"]>("phone");
const { value: password, errorMessage: passwordError } = useField<RegisterDto["password"]>("password");

const { mutate, isPending } = UseRegister();
const router = useRouter();

const submitForm = handleSubmit((values: RegisterDto) => {
  mutate(values, {
    onSuccess: () => {
      router.replace({ name: "Login" });
    },
  });
});
</script>
