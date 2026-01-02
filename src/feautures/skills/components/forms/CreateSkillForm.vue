<template>
  <form
    id="create-skill-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <FwbInput
      label="Nombre"
      placeholder="Ej: TypeScript"
      v-model="name"
      :validation-status="nameError ? 'error' : undefined"
      :helper-text="nameError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ nameError }}</span>
      </template></FwbInput
    >

    <FwbInput
      label="Nivel"
      type="number"
      placeholder="Ej: 5"
      v-model="level"
      :validation-status="levelError ? 'error' : undefined"
      :helper-text="levelError"
      min="1"
      max="10"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ levelError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      label="Categoría"
      placeholder="Ej: Backend"
      v-model="category"
      :validation-status="categoryError ? 'error' : undefined"
      :helper-text="categoryError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ categoryError }}</span>
      </template></FwbInput
    >
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useQueryClient } from "@tanstack/vue-query";
import { FwbInput } from "flowbite-vue";
import * as yup from "yup";
import type { CreateSkillsDto } from "../../type/SkillsType";
import { UseCreateSkill } from "../../composables/createSkill";

const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),

  level: yup
    .number()
    .typeError("El nivel debe ser un número")
    .required("El nivel es obligatorio")
    .min(1, "Mínimo 1")
    .max(10, "Máximo 10"),

  category: yup.string().required("La categoría es obligatoria"),
});

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { handleSubmit } = useForm<CreateSkillsDto>({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField<string>("name");

const { value: level, errorMessage: levelError } = useField<number>("level");

const { value: category, errorMessage: categoryError } =
  useField<string>("category");

const { mutate, isPending } = UseCreateSkill();
const queryClient = useQueryClient();

const submitForm = handleSubmit((values) => {
  mutate(values, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-skills"],
      });
      emit("success");
    },
  });
});

defineExpose({
  isPending,
});
</script>
