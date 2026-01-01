<template>
  <form
    id="edit-sn-info-form"
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
        label="Nombre"
        placeholder="Ej: Página principal"
        autocomplete="off"
        aria-label="Nombre"
        v-bind="bind('name')"
      />

      <FwbInput
        id="redirectLink"
        name="redirectLink"
        type="url"
        label="Enlace de redirección"
        placeholder="https://ejemplo.com"
        aria-label="Enlace de redirección"
        v-bind="bind('redirectLink')"
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
import type { SocialNetworkRefType } from "../../type/SocialNetworkRefType";
import { SocialNetworksService } from "../../service/SocialNetworkRefService";
import { UseEditSN } from "../../composables/useEditSN";

const props = defineProps<{
  id: number;
}>();

const {
  data: me,
  isLoading,
  isError,
  error,
} = useQuery<SocialNetworkRefType>({
  queryKey: ["SN", props.id],
  queryFn: () => SocialNetworksService.getOneSN(props.id),
  retry: false,
});

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { handleSubmit, values, setValues, setFieldValue } = useForm<
  Partial<SocialNetworkRefType>
>({
  initialValues: {
    name: "",
    redirectLink: "",
  },
});

const initialData = ref<SocialNetworkRefType | null>(null);

watch(
  me,
  (data) => {
    if (!data) return;

    setValues(normalizeObject<Partial<SocialNetworkRefType>>(data));
    initialData.value = { ...normalizeObject<SocialNetworkRefType>(data) };
  },
  { immediate: true }
);

const { mutate, isPending } = UseEditSN();
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
        queryKey: ["my-networkRefs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["SN", props.id],
      });
      emit("success");
    },
  });
});

const bind = veeBind<Partial<SocialNetworkRefType>>(values, setFieldValue);

defineExpose({
  isPending,
});
</script>
