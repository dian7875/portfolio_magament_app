<template>
  <form
    id="edit-lang-info-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <p v-if="isLoading">Cargando información...</p>

    <p v-else-if="isError" class="text-red-500">
      {{ error?.message }}
    </p>

    <template v-else>
      <FwbInput
        id="language"
        name="language"
        label="Nombre del idioma"
        placeholder="Ej: Ingles"
        autocomplete="language"
        aria-label="Nombre del idioma"
        v-bind="bind('language')"
      />

      <FwbInput
        id="level"
        name="level"
        label="Nivel de dominio"
        placeholder="Ej: B2"
        v-bind="bind('level')"
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
import type { LanguageType } from "../../type/LanguageType";
import { LanguageService } from "../../service/LanguagesService";
import { UseEditLanguage } from "../../composables/useEditLanguage";
import toast from "vue3-hot-toast";

const props = defineProps<{
  id: number;
}>();

const {
  data: item,
  isLoading,
  isError,
  error,
} = useQuery<LanguageType>({
  queryKey: ["language", props.id],
  queryFn: () => LanguageService.getOneLanguage(props.id),
  retry: false,
});

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { handleSubmit, values, setValues, setFieldValue } = useForm<
  Partial<LanguageType>
>({
  initialValues: {
    language: "",
    level: "",
  },
});

const initialData = ref<LanguageType | null>(null);

watch(
  item,
  (data) => {
    if (!data) return;

    setValues(normalizeObject<Partial<LanguageType>>(data));
    initialData.value = { ...normalizeObject<LanguageType>(data) };
  },
  { immediate: true }
);

const { mutate, isPending } = UseEditLanguage();
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
        queryKey: ["my-languages"],
      });
      emit("success");
    },
  });
});

const bind = veeBind<Partial<LanguageType>>(values, setFieldValue);

defineExpose({
  isPending,
});
</script>
