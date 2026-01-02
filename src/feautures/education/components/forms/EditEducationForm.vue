<template>
  <form
    id="edit-education-info-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <p v-if="isLoading">Cargando información...</p>

    <p v-else-if="isError" class="text-red-500">
      {{ error?.message }}
    </p>

    <template v-else>
      <FwbInput
        id="institution"
        name="institution"
        label="Institución"
        placeholder="Ej: Universidad de Costa Rica"
        v-bind="bind('institution')"
      />

      <FwbInput
        id="title"
        name="title"
        label="Título"
        placeholder="Ej: Ingeniería en Sistemas"
        autocomplete="off"
        v-bind="bind('title')"
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
      <FwbCheckbox
        id="finished"
        name="finished"
        label="Finalizado"
        :model-value="values.finished ?? false"
        @update:model-value="(val) => setFieldValue('finished', val as boolean)"
      />

      <FwbStyleDatePicker
        id="endDate"
        name="endDate"
        label="Fecha de fin"
        :disabled="!values.finished"
        :model-value="values.endDate"
        @update:model-value="(val) => setFieldValue('endDate', val as string)"
      />
    </template>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { FwbCheckbox, FwbInput, FwbTextarea } from "flowbite-vue";
import { getChangedFields } from "../../../../shared/utils/GetChangedFields";
import { veeBind } from "../../../../shared/utils/VeeBindHelper";
import { normalizeObject } from "../../../../shared/utils/NormalizeObjet";
import toast from "vue3-hot-toast";
import type { EducationType } from "../../type/EducationType";
import { EducationService } from "../../service/EducationService";
import FwbStyleDatePicker from "../../../../shared/components/FwbStyleDatePicker.vue";
import { UseEditDegree } from "../../composables/useEditDregree";

const props = defineProps<{
  id: number;
}>();

const {
  data: item,
  isLoading,
  isError,
  error,
} = useQuery<EducationType>({
  queryKey: ["education", props.id],
  queryFn: () => EducationService.getOneEducation(props.id),
  retry: false,
});

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { handleSubmit, values, setValues, setFieldValue } = useForm<
  Partial<EducationType>
>({
  initialValues: {
    institution: "",
    title: "",
    description: "",
    startDate: "",
    finished: false,
    endDate: "",
  },
});

const initialData = ref<EducationType | null>(null);

watch(
  item,
  (data) => {
    if (!data) return;

    setValues(normalizeObject<Partial<EducationType>>(data));
    initialData.value = { ...normalizeObject<EducationType>(data) };
  },
  { immediate: true }
);

const { mutate, isPending } = UseEditDegree();
const queryClient = useQueryClient();

const submitForm = handleSubmit(async (values) => {
  if (!initialData.value) return;

  const data = getChangedFields(initialData.value, values);

  if (Object.keys(data).length === 0) {
    toast("No se han realizado cambios.");
    emit("success");
    return;
  }

  if (!data.finished) {
    data.endDate = null;
  }

  const payload = {
    id: props.id,
    data: data,
  };

  mutate(payload, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-education"],
      });
      emit("success");
    },
  });
});

const bind = veeBind<Partial<EducationType>>(values, setFieldValue);

defineExpose({
  isPending,
});
</script>
