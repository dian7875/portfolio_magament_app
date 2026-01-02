<template>
  <form
    id="create-language-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <FwbInput
      label="Nombre del idioma"
      placeholder="Ej: Inglés"
      v-model="language"
      :validation-status="languageError ? 'error' : undefined"
      :helper-text="languageError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ languageError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      label="Nivel de dominio"
      placeholder="Ej: B2"
      v-model="level"
      :validation-status="levelError ? 'error' : undefined"
      :helper-text="levelError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ levelError }}</span>
      </template>
    </FwbInput>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/vue-query";
import type { CreateLanguageDto } from "../../type/LanguageType";
import { UseCreateLanguage } from "../../composables/useCreateLanguage";
import { FwbInput } from "flowbite-vue";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const schema = yup.object({
  language: yup.string().required("El nombre del idioma es obligatorio"),
  level: yup.string().required("El nivel es obligatorio"),
});

const { handleSubmit } = useForm<CreateLanguageDto>({
  validationSchema: schema,
});

const { value: language, errorMessage: languageError } =
  useField<string>("language");
const { value: level, errorMessage: levelError } = useField<string>("level");

const { mutate, isPending } = UseCreateLanguage();
const queryClient = useQueryClient();

const submitForm = handleSubmit((values) => {
  mutate(values, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-languages"] });
      emit("success");
    },
  });
});

defineExpose({ isPending });
</script>
