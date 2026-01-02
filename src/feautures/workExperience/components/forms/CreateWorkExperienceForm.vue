<template>
  <form
    id="create-experience-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <FwbInput
      label="Cargo"
      placeholder="Ej: Desarrollador Frontend"
      v-model="role"
      :validation-status="roleError ? 'error' : undefined"
      :helper-text="roleError"
    />

    <FwbInput
      label="Empresa"
      placeholder="Ej: MiEmpresa S.A."
      v-model="company"
      :validation-status="companyError ? 'error' : undefined"
      :helper-text="companyError"
    />

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
      @update:model-value="(val) => (startDate = val)"
    />

    <FwbStyleDatePicker
      id="endDate"
      name="endDate"
      label="Fecha de fin"
      :model-value="endDate"
      @update:model-value="(val) => (endDate = val)"
    />

    <div class="flex flex-col gap-2">
      <label
        for="newResponsability"
        class="block text-sm font-medium text-gray-900"
      >
        Responsabilidades
      </label>
      <div class="flex gap-2">
        <input
          id="newResponsability"
          type="text"
          v-model="newResponsability"
          placeholder="Agregar responsabilidad"
          class="flex-1 border rounded px-3 py-2 text-black"
          @keyup.enter.prevent="addResponsability"
        />
        <button
          type="button"
          class="bg-blue-500 text-white px-3 py-2 rounded"
          @click="addResponsability"
        >
          Agregar
        </button>
      </div>
      <ul class="flex flex-col gap-1">
        <li
          v-for="(item, index) in values.responsibilities ?? []"
          :key="index"
          class="flex justify-between items-center bg-gray-100 px-3 py-1 rounded"
        >
          <span class="text-black!">{{ item }}</span>
          <button
            type="button"
            class="text-red-500 font-bold"
            @click="
              setFieldValue(
                'responsibilities',
                (values.responsibilities ?? []).filter((_, i) => i !== index)
              )
            "
          >
            ×
          </button>
        </li>
      </ul>
    </div>
  </form>
</template>
<script setup lang="ts">
import * as yup from "yup";
import type { CreateExperienceDto } from "../../type/ExperiencesType";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import { UseRegisterExperience } from "../../composables/useRegisterExperience";
import { FwbInput, FwbTextarea } from "flowbite-vue";
import FwbStyleDatePicker from "../../../../shared/components/FwbStyleDatePicker.vue";
import toast from "vue3-hot-toast";

const experienceSchema = yup.object({
  role: yup.string().required("El cargo es obligatorio"),
  company: yup.string().required("La empresa es obligatoria"),

  endDate: yup.string().nullable().optional(),

  description: yup.string().default("").optional(),

  responsibilities: yup.array(yup.string()).default([]).optional(),

  hidden: yup.boolean().default(false),
});

const { handleSubmit, values, setFieldValue } = useForm<CreateExperienceDto>({
  validationSchema: experienceSchema,
  initialValues: {
    description: "",
    responsibilities: [],
    hidden: false,
  },
});

const { value: role, errorMessage: roleError } = useField<string>("role");

const { value: company, errorMessage: companyError } =
  useField<string>("company");

const { value: startDate } = useField<string | null>("startDate");

const { value: endDate } = useField<string | null>("endDate");

const newResponsability = ref("");

function addResponsability() {
  if (!newResponsability.value.trim()) return;

  setFieldValue("responsibilities", [
    ...(values.responsibilities ?? []),
    newResponsability.value.trim(),
  ]);

  newResponsability.value = "";
}

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { mutate, isPending } = UseRegisterExperience();
const queryClient = useQueryClient();
const submitForm = handleSubmit(async (values) => {
  if (!values.startDate) {
    toast.error("Seleccione la fecha de inicio.");
    return;
  }
  mutate(values, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-experiences"],
      });
      emit("success");
    },
  });
});

defineExpose({
  isPending,
});
</script>
