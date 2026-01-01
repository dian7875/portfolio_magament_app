<template>
  <form
    id="edit-skill-info-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <p v-if="isLoading">Cargando información...</p>

    <p v-else-if="isError" class="text-red-500">
      {{ error?.message }}
    </p>

    <template v-else>
      <FwbInput
        id="name"
        name="name"
        label="Nombre de la habilidad"
        placeholder="Ej: TypeScript"
        autocomplete="off"
        aria-label="Nombre de la habilidad"
        v-bind="bind('name')"
      />

      <FwbInput
        id="level"
        name="level"
        type="number"
        label="Nivel"
        placeholder="Ej: 5"
        min="0"
        max="10"
        v-bind="bind('level')"
      />

      <FwbInput
        id="category"
        name="category"
        label="Categoría"
        placeholder="Ej: Backend"
        autocomplete="off"
        v-bind="bind('category')"
      />
    </template>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { FwbInput } from "flowbite-vue";
import { getChangedFields } from "../../../../shared/utils/GetChangedFields";
import { veeBind } from "../../../../shared/utils/VeeBindHelper";
import { normalizeObject } from "../../../../shared/utils/NormalizeObjet";
import toast from "vue3-hot-toast";
import type { SkillsType } from "../../type/SkillsType";
import { SkillsService } from "../../service/SkillsService";
import { UseUpdateSkill } from "../../composables/updateSkill";

const props = defineProps<{
  id: number;
}>();

const {
  data: item,
  isLoading,
  isError,
  error,
} = useQuery<SkillsType>({
  queryKey: ["skill", props.id],
  queryFn: () => SkillsService.getOneSkill(props.id),
  retry: false,
});

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { handleSubmit, values, setValues, setFieldValue } = useForm<
  Partial<SkillsType>
>({
  initialValues: {
    name: "",
    level: 0,
    category: "",
  },
});

const initialData = ref<SkillsType | null>(null);

watch(
  item,
  (data) => {
    if (!data) return;

    setValues(normalizeObject<Partial<SkillsType>>(data));
    initialData.value = { ...normalizeObject<SkillsType>(data) };
  },
  { immediate: true }
);

const { mutate, isPending } = UseUpdateSkill();
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
        queryKey: ["my-skills"],
      });
      emit("success");
    },
  });
});

const bind = veeBind<Partial<SkillsType>>(values, setFieldValue);

defineExpose({
  isPending,
});
</script>
