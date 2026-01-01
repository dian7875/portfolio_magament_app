<template>
  <form
    id="edit-experience-info-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <p v-if="isLoading">Cargando información...</p>

    <p v-else-if="isError" class="text-red-500">
      {{ error?.message }}
    </p>

    <template v-else>
      <FwbInput
        id="role"
        name="role"
        label="Cargo"
        placeholder="Ej: Desarrollador Frontend"
        v-bind="bind('role')"
      />
      <FwbInput
        id="company"
        name="company"
        label="Empresa"
        placeholder="Ej: MiEmpresa S.A."
        v-bind="bind('company')"
      />

      <FwbTextarea
        id="description"
        name="description"
        label="Descripción"
        placeholder="Descripción breve del estudio"
        :model-value="values.description ?? ''"
        @update:model-value="(val) => setFieldValue('description', val ?? '')"
      />

      <FwbStyleDatePicker
        id="startDate"
        name="startDate"
        label="Fecha de inicio"
        :model-value="values.startDate"
        @update:model-value="(val) => setFieldValue('startDate', val as string)"
      />
      <FwbStyleDatePicker
        id="endDate"
        name="endDate"
        label="Fecha de fin"
        :model-value="values.endDate"
        @update:model-value="(val) => setFieldValue('endDate', val as string)"
      />

      <div class="flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-900"
          >Responsabilidades</label
        >
        <div class="flex gap-2">
          <input
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
    </template>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { FwbInput, FwbTextarea } from "flowbite-vue";
import { getChangedFields } from "../../../../shared/utils/GetChangedFields";
import { veeBind } from "../../../../shared/utils/VeeBindHelper";
import { normalizeObject } from "../../../../shared/utils/NormalizeObjet";
import toast from "vue3-hot-toast";
import FwbStyleDatePicker from "../../../../shared/components/FwbStyleDatePicker.vue";
import type { ExperiencesType } from "../../type/ExperiencesType";
import { WorkExperiencesService } from "../../service/WorksExperienceService";
import { UseEditExperience } from "../../composables/useEditExperience";

const newResponsability = ref("");

function addResponsability() {
  if (!newResponsability.value.trim()) return;
  setFieldValue("responsibilities", [
    ...(values.responsibilities ?? []),
    newResponsability.value.trim(),
  ]);
  newResponsability.value = "";
}

const props = defineProps<{
  id: number;
}>();

const {
  data: item,
  isLoading,
  isError,
  error,
} = useQuery<ExperiencesType>({
  queryKey: ["education", props.id],
  queryFn: () => WorkExperiencesService.getOneExperience(props.id),
  retry: false,
});

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { handleSubmit, values, setValues, setFieldValue } = useForm<
  Partial<ExperiencesType>
>({
  initialValues: {
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    responsibilities: [],
  },
});

const initialData = ref<ExperiencesType | null>(null);

watch(
  item,
  (data) => {
    if (!data) return;

    setValues(normalizeObject<Partial<ExperiencesType>>(data));
    initialData.value = { ...normalizeObject<ExperiencesType>(data) };
  },
  { immediate: true }
);

const { mutate, isPending } = UseEditExperience();
const queryClient = useQueryClient();

const submitForm = handleSubmit(async (values) => {
  if (!initialData.value) return;

  const data = getChangedFields(initialData.value, values);

  if (Object.keys(data).length === 0) {
    toast("No se han realizado cambios.");
    emit("success");
    return;
  }

  const payload = {
    id: props.id,
    data: data,
  };

  mutate(payload, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-experiences"],
      });
      emit("success");
    },
  });
});

const bind = veeBind<Partial<ExperiencesType>>(values, setFieldValue);

defineExpose({
  isPending,
});
</script>
