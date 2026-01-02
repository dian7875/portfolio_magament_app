<template>
  <form
    id="create-education-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <FwbInput
      label="Institución"
      placeholder="Ej: Universidad XYZ"
      v-model="institution"
      :validation-status="institutionError ? 'error' : undefined"
      :helper-text="institutionError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ institutionError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      label="Título"
      placeholder="Ej: Licenciatura en Ingeniería"
      v-model="title"
      :validation-status="titleError ? 'error' : undefined"
      :helper-text="titleError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ titleError }}</span>
      </template>
    </FwbInput>

    <FwbTextarea
      label="Descripción"
      placeholder="Descripción breve del estudio"
      @update:model-value="(val) => setFieldValue('description', val ?? '')"
    />

    <FwbStyleDatePicker
      id="startDate"
      name="startDate"
      label="Fecha de inicio"
      :model-value="startDate"
      @update:model-value="(val) => (startDate = val as string)"
    />

    <FwbCheckbox
      id="finished"
      name="finished"
      label="Finalizado"
      :model-value="finished"
      @update:model-value="(val) => setFieldValue('finished', val as boolean)"
    />

    <FwbStyleDatePicker
      id="endDate"
      name="endDate"
      label="Fecha de finalización"
      :disabled="!finished"
      :model-value="endDate"
      @update:model-value="(val) => (endDate = val)"
    />
  </form>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/vue-query";
import { FwbCheckbox, FwbInput, FwbTextarea } from "flowbite-vue";
import { UseCreateDegree } from "../../composables/useCreateDegree";
import FwbStyleDatePicker from "../../../../shared/components/FwbStyleDatePicker.vue";
import type { CreateEducationDto } from "../../type/EducationType";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const schema = yup.object({
  institution: yup.string().required("La institución es obligatoria"),
  title: yup.string().required("El título es obligatorio"),
  description: yup.string().nullable(),
  startDate: yup.string().required("La fecha de inicio es obligatoria"),
  finished: yup.boolean(),
  endDate: yup.string().nullable(),
});

const { handleSubmit, setFieldValue } = useForm<CreateEducationDto>({
  validationSchema: schema,
  initialValues: {
    description: "",
  },
});

const { value: institution, errorMessage: institutionError } =
  useField<string>("institution");
const { value: title, errorMessage: titleError } = useField<string>("title");
const { value: startDate } = useField<string>("startDate");
const { value: endDate } = useField<string | null>("endDate");
const { value: finished } = useField<boolean>("finished");

const { mutate, isPending } = UseCreateDegree();
const queryClient = useQueryClient();

const submitForm = handleSubmit((values) => {
  mutate(values, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-education"] });
      emit("success");
    },
  });
});

defineExpose({ isPending });
</script>
