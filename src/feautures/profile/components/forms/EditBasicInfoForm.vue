<template>
  <form
    id="edit-basic-info-form"
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
        placeholder="Ej: Juan Pérez"
        autocomplete="name"
        aria-label="Nombre completo"
        v-bind="bind('name')"
      />

      <FwbInput
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="ejemplo@correo.com"
        autocomplete="email"
        v-bind="bind('email')"
      />

      <FwbInput
        id="phone"
        label="Teléfono"
        placeholder="Ej: +506 8888 9999"
        autocomplete="tel"
        aria-label="Número de teléfono"
        v-bind="bind('phone')"
      />

      <FwbInput
        id="title"
        label="Título"
        placeholder="Ej: Desarrollador Full Stack"
        aria-label="Título profesional"
        v-bind="bind('title')"
      />

      <FwbInput
        id="subTitle"
        label="Subtítulo"
        placeholder="Ej: Apasionado por los retos"
        aria-label="Subtítulo profesional"
        v-bind="bind('subTitle')"
      />

      <FwbInput
        id="location"
        label="Ubicación"
        placeholder="Ej: San José, Costa Rica"
        aria-label="Ubicación"
        v-bind="bind('location')"
      />

      <FwbInput
        id="hostUrl"
        label="Website"
        placeholder="Ej: https://miportafolio.dev"
        aria-label="Sitio web personal"
        v-bind="bind('hostUrl')"
      />

      <FwbTextarea
        id="bio"
        label="Bio"
        placeholder="Algo que pueda resumirte para texto principal de tu portfolio..."
        aria-label="Biografía profesional"
        v-bind="bind('bio')"
      />
    </template>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { UserService } from "../../service/userService";
import type { UserBasicInfoType } from "../../type/userBasicInfoType";
import { FwbInput, FwbTextarea } from "flowbite-vue";
import { getChangedFields } from "../../../../shared/utils/GetChangedFields";
import { veeBind } from "../../../../shared/utils/VeeBindHelper";
import { normalizeObject } from "../../../../shared/utils/NormalizeObjet";
import { UseEditUser } from "../../composables/EditUserBasicInfo";
import toast from "vue3-hot-toast";

const {
  data: me,
  isLoading,
  isError,
  error,
} = useQuery<UserBasicInfoType>({
  queryKey: ["me"],
  queryFn: UserService.getMe,
  retry: false,
});

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const { handleSubmit, values, setValues, setFieldValue } =
  useForm<UserBasicInfoType>({
    initialValues: {
      name: "",
      bio: "",
      title: "",
      subTitle: "",
      location: "",
      phone: "",
      email: "",
      hostUrl: "",
    },
  });

const initialData = ref<UserBasicInfoType | null>(null);

watch(
  me,
  (data) => {
    if (!data) return;

    setValues(normalizeObject<UserBasicInfoType>(data));
    initialData.value = { ...normalizeObject<UserBasicInfoType>(data) };
  },
  { immediate: true }
);

const { mutate, isPending } = UseEditUser();
const queryClient = useQueryClient();

const submitForm = handleSubmit(async (values) => {
  if (!initialData.value) return;

  const payload = getChangedFields(initialData.value, values);

  if (Object.keys(payload).length === 0) {
    toast("No se han realizado cambios.");
    emit("update:visible", false);
    return;
  }

  mutate(payload, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      emit("update:visible", false);
    },
  });
});

const bind = veeBind<UserBasicInfoType>(values, setFieldValue);

defineExpose({
  isPending,
});
</script>
