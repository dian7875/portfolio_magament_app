<template>
  <form
    id="create-project-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-3 custom-text-area pb-1"
  >
    <FwbInput
      label="Título del proyecto"
      placeholder="Ej: Mi proyecto"
      v-model="title"
      :validation-status="titleError ? 'error' : undefined"
      :helper-text="titleError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ titleError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      label="Subtítulo"
      placeholder="Ej: Proyecto de demostración"
      v-model="subtitle"
      :validation-status="subtitleError ? 'error' : undefined"
      :helper-text="subtitleError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ subtitleError }}</span>
      </template>
    </FwbInput>

    <FwbTextarea
      label="Descripción"
      placeholder="Describe tu proyecto"
      @update:model-value="(val) => setFieldValue('description', val ?? '')"
    />

    <FwbInput
      label="Repositorio"
      placeholder="https://github.com/ejemplo"
      v-model="repoUrl"
      :validation-status="repoUrlError ? 'error' : undefined"
      :helper-text="repoUrlError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ repoUrlError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      label="Demo"
      placeholder="https://demo.com"
      v-model="demoUrl"
      :validation-status="demoUrlError ? 'error' : undefined"
      :helper-text="demoUrlError"
    >
      <template #validationMessage>
        <span class="font-medium text-red-700!">{{ demoUrlError }}</span>
      </template>
    </FwbInput>

    <FwbStyleDatePicker
      id="finishDate"
      name="finishDate"
      label="Fecha de finalización"
      :model-value="finishDate"
      @update:model-value="(val) => (finishDate = val as string)"
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
          v-for="(tech, index) in techStack"
          :key="index"
          class="flex items-center gap-2 mt-2"
        >
          <span class="bg-gray-200 px-2 py-1 rounded text-black">{{
            tech
          }}</span>
          <button type="button" class="text-red-500" @click="removeTech(index)">
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
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/vue-query";
import { FwbInput, FwbTextarea } from "flowbite-vue";
import FwbStyleDatePicker from "../../../shared/components/FwbStyleDatePicker.vue";
import { UseCreateProject } from "../composables/useCreateProject";
import type { CreateProjectDto } from "../type/ProjectType";

const techStack = ref<string[]>([]);
const newTech = ref("");
const showTech = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const showImages = ref(false);
const newFiles = ref<File[]>([]);

const allPreviewImages = computed(() =>
  newFiles.value.map((file) => ({ src: URL.createObjectURL(file), file }))
);

function addTech() {
  if (!newTech.value.trim()) return;
  techStack.value.push(newTech.value.trim());
  newTech.value = "";
}

function removeTech(index: number) {
  techStack.value.splice(index, 1);
}

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const files = Array.from(target.files);
  newFiles.value.push(...files);
  target.value = "";
}

function removeImage(index: number) {
  newFiles.value.splice(index, 1);
}

const schema = yup.object({
  title: yup.string().required("El título es obligatorio"),
  subtitle: yup.string().nullable(),
  description: yup.string().nullable(),
  repoUrl: yup.string().url("Debe ser una URL válida").nullable(),
  demoUrl: yup.string().url("Debe ser una URL válida").nullable(),
});

const { handleSubmit, setFieldValue } = useForm<CreateProjectDto>({
  validationSchema: schema,
  initialValues: {
    subtitle: "",
    description: "",
    repoUrl: "",
    demoUrl: "",
    finishDate: "",
  },
});

const { value: title, errorMessage: titleError } = useField<string>("title");
const { value: subtitle, errorMessage: subtitleError } =
  useField<string>("subtitle");
const { value: repoUrl, errorMessage: repoUrlError } =
  useField<string>("repoUrl");
const { value: demoUrl, errorMessage: demoUrlError } =
  useField<string>("demoUrl");

const finishDate = ref<string | null>(null);
const description = ref<string | null>(null);

const queryClient = useQueryClient();
const { mutate, isPending } = UseCreateProject();

const submitForm = handleSubmit(() => {
  const formData = new FormData();
  formData.append("title", title.value);
  if (subtitle.value) formData.append("subtitle", subtitle.value);
  if (description.value) formData.append("description", description.value);
  if (repoUrl.value) formData.append("repoUrl", repoUrl.value);
  if (demoUrl.value) formData.append("demoUrl", demoUrl.value);
  if (finishDate.value) formData.append("finishDate", finishDate.value);
  techStack.value.forEach((tech) => formData.append("techStack", tech));
  newFiles.value.forEach((file) => formData.append("images", file));

  mutate(formData as unknown as CreateProjectDto, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      emit("success");
    },
  });
});

const emit = defineEmits<{ (e: "success"): void }>();

defineExpose({
  isPending,
});
</script>
