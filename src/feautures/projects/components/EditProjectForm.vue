<template>
  <form
    id="edit-project-info-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <p v-if="isLoading">Cargando información...</p>
    <p v-else-if="isError" class="text-red-500">{{ error?.message }}</p>

    <template v-else>
      <FwbInput
        id="title"
        name="title"
        label="Título del proyecto"
        placeholder="Ej: Mi proyecto"
        v-bind="bind('title')"
      />
      <FwbInput
        id="subtitle"
        name="subtitle"
        label="Subtítulo"
        placeholder="Ej: Proyecto de demostración"
        :model-value="values.subtitle ?? ''"
        @update:model-value="(val) => setFieldValue('subtitle', val as string ?? '')"
      />

      <FwbTextarea
        id="description"
        name="description"
        label="Descripción"
        placeholder="Describe tu proyecto"
        :model-value="values.description ?? ''"
        @update:model-value="(val) => setFieldValue('description', val ?? '')"
      />

      <FwbStyleDatePicker
        id="finishDate"
        name="finishDate"
        label="Fecha de finalización"
        :model-value="values.finishDate"
        @update:model-value="(val) => setFieldValue('finishDate', val as string)"
      />

      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label>Tecnologías</label>
          <button
            type="button"
            class="text-sm text-blue-500"
            @click="showTech = !showTech"
          >
            {{ showTech ? "Ocultar" : "Mostrar" }}
          </button>
        </div>

        <div v-if="showTech">
          <div class="flex gap-2">
            <input
              type="text"
              v-model="newTech"
              placeholder="Agregar tecnología"
              class="border rounded px-2 py-1 w-full text-black"
              @keyup.enter.prevent="addTech"
            />
            <button
              type="button"
              @click="addTech"
              class="bg-blue-500 text-white px-3 rounded"
            >
              Agregar
            </button>
          </div>

          <div
            v-for="(tech, index) in values.techStack"
            :key="index"
            class="flex items-center gap-2 mt-2"
          >
            <span class="bg-gray-200 px-2 py-1 rounded text-black">{{
              tech
            }}</span>
            <button
              type="button"
              class="text-red-500"
              @click="removeTech(index)"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mt-4">
        <label class="text-sm font-medium text-gray-900"
          >Imágenes del proyecto</label
        >
        <button
          type="button"
          class="text-sm text-blue-500"
          @click="showImages = !showImages"
        >
          {{ showImages ? "Ocultar" : "Mostrar" }}
        </button>
      </div>

      <div v-if="showImages" class="grid grid-cols-4 gap-3 items-center mt-2">
        <div
          class="flex items-center justify-center h-24 w-24 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
          @click="fileInput?.click()"
        >
          <span class="text-gray-500 text-lg">+</span>
          <input
            type="file"
            multiple
            accept="image/*"
            ref="fileInput"
            class="hidden"
            @change="handleFiles"
          />
        </div>

        <div
          v-for="(img, index) in allPreviewImages"
          :key="index"
          class="relative h-24 w-24 rounded-lg overflow-hidden border border-gray-300"
        >
          <img
            :src="img.src"
            alt="Imagen proyecto"
            class="object-cover h-full w-full"
          />
          <button
            type="button"
            class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            @click="removeImage(index)"
          >
            &times;
          </button>
        </div>
      </div>
    </template>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useForm } from "vee-validate";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { FwbInput, FwbTextarea } from "flowbite-vue";
import toast from "vue3-hot-toast";
import type { Project } from "../type/ProjectType";
import { ProjectsService } from "../service/ProjectsService";
import { normalizeObject } from "../../../shared/utils/NormalizeObjet";
import { UseEditProject } from "../composables/useEditProject";
import { getChangedFields } from "../../../shared/utils/GetChangedFields";
import { veeBind } from "../../../shared/utils/VeeBindHelper";
import FwbStyleDatePicker from "../../../shared/components/FwbStyleDatePicker.vue";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{ (e: "success"): void }>();

const { handleSubmit, values, setValues, setFieldValue } = useForm<
  Partial<Project>
>({
  initialValues: {
    title: "",
    subtitle: "",
    description: "",
    imagesUrl: [],
    imagesPath: [],
    repoUrl: "",
    demoUrl: "",
    techStack: [],
    finishDate: "",
  },
});

const initialData = ref<Project | null>(null);
const newTech = ref("");
const showTech = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const showImages = ref(false);

const oldImages = ref<string[]>([]);
const oldImagePaths = ref<string[]>([]);
const newFiles = ref<File[]>([]);

const allPreviewImages = computed(() => {
  const oldPreviews = oldImages.value.map((url, i) => ({
    src: url,
    type: "old",
    index: i,
  }));
  const newPreviews = newFiles.value.map((file, i) => ({
    src: URL.createObjectURL(file),
    type: "new",
    index: i,
  }));
  return [...oldPreviews, ...newPreviews];
});

const {
  data: item,
  isLoading,
  isError,
  error,
} = useQuery<Project>({
  queryKey: ["project", props.id],
  queryFn: () => ProjectsService.getOneProject(props.id),
  retry: false,
});

watch(
  item,
  (data) => {
    if (!data) return;
    oldImages.value = [...(data.imagesUrl ?? [])];
    oldImagePaths.value = [...(data.imagesPath ?? [])];
    setValues(normalizeObject<Partial<Project>>(data));
    initialData.value = { ...normalizeObject<Project>(data) };
  },
  { immediate: true }
);

function addTech() {
  if (!newTech.value.trim()) return;
  setFieldValue("techStack", [
    ...(values.techStack ?? []),
    newTech.value.trim(),
  ]);
  newTech.value = "";
}

function removeTech(index: number) {
  setFieldValue(
    "techStack",
    (values.techStack ?? []).filter((_, i) => i !== index)
  );
}

const handleFiles = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const files = Array.from(target.files);
  newFiles.value.push(...files);
  target.value = "";
};

function removeImage(globalIndex: number) {
  const oldCount = oldImages.value.length;
  if (globalIndex < oldCount) {
    oldImages.value.splice(globalIndex, 1);
    oldImagePaths.value.splice(globalIndex, 1);
  } else {
    const newIndex = globalIndex - oldCount;
    newFiles.value.splice(newIndex, 1);
  }
}

const { mutate, isPending } = UseEditProject();
const queryClient = useQueryClient();

const submitForm = handleSubmit(async (values) => {
  if (!initialData.value) return;

  const data = getChangedFields(initialData.value, values);

  if (
    Object.keys(data).length === 0 &&
    newFiles.value.length === 0 &&
    oldImages.value.length === initialData.value.imagesUrl?.length
  ) {
    toast("No se han realizado cambios.");
    emit("success");
    return;
  }

  const formData = new FormData();

  for (const key in data) {
    const typedKey = key as keyof Project;
    const value = data[typedKey];
    if (
      value !== undefined &&
      value !== null &&
      key !== "imagesUrl" &&
      key !== "imagesPath"
    ) {
      if (Array.isArray(value))
        value.forEach((v) => formData.append(typedKey, String(v)));
      else formData.append(typedKey, String(value));
    }
  }

  formData.append("imagesPath", oldImagePaths.value.join(","));
  newFiles.value.forEach((file) => formData.append("images", file));

  mutate(
    { id: props.id, data: formData },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my-projects"] });
        emit("success");
      },
    }
  );
});

const bind = veeBind<Partial<Project>>(values, setFieldValue);
defineExpose({ isPending });
</script>
