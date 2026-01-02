<template>
  <form
    id="create-sn-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <FwbInput
      label="Nombre"
      placeholder="Ej: Página principal"
      v-model="name"
      :validation-status="nameError ? 'error' : undefined"
    />

    <FwbInput
      label="Enlace de redirección"
      type="url"
      placeholder="https://ejemplo.com"
      v-model="redirectLink"
      :validation-status="linkError ? 'error' : undefined"
      :helper-text="linkError"
    />
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useQueryClient } from "@tanstack/vue-query";
import { FwbInput } from "flowbite-vue";
import type { CreateSocialNetworkDto } from "../../type/SocialNetworkRefType";
import { UseCreateSN } from "../../composables/useCreateSN";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),

  redirectLink: yup
    .string()
    .required("El enlace es obligatorio")
    .url("Debe ser una URL válida"),
});

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { handleSubmit } = useForm<CreateSocialNetworkDto>({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: redirectLink, errorMessage: linkError } =
  useField<string>("redirectLink");

const { mutate, isPending } = UseCreateSN();
const queryClient = useQueryClient();
const submitForm = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-networkRefs"],
      });
      emit("success");
    },
  });
});

defineExpose({
  isPending,
});
</script>
