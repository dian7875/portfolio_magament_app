<template>
  <form
    id="edit-cv-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-4 items-center"
  >
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-1">
        <span class="text-sm mb-1">Actual</span>
        <div class="w-48 h-64 border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            v-if="props.currentCVUrl"
            :src="props.currentCVUrl"
            class="w-full h-full"
          ></iframe>
          <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">
            Sin CV
          </div>
        </div>
      </div>

      <span class="text-xl font-bold">→</span>

      <div class="flex flex-col items-center gap-1">
        <span class="text-sm mb-1">Nuevo</span>
        <div class="w-48 h-64 border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            v-if="previewUrl"
            :src="previewUrl"
            class="w-full h-full"
          ></iframe>
          <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">
            Sin archivo
          </div>
        </div>
      </div>
    </div>

    <input
      type="file"
      accept="application/pdf"
      @change="onFileChange"
      class="hidden"
      ref="fileInput"
    />
    <button
      type="button"
      @click="triggerFileSelect"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Seleccionar CV
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import { UseEditUserCV } from "../../composables/EditUserCV";
import toast from "vue3-hot-toast";

const props = defineProps<{
  currentCVUrl?: string | null;
}>();

const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

const { mutate, isPending } = UseEditUserCV();
const fileInput = ref<HTMLInputElement>();

function triggerFileSelect() {
  fileInput.value?.click();
}

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files || !files[0]) return;

  selectedFile.value = files[0];
  previewUrl.value = URL.createObjectURL(selectedFile.value); 
}

const queryClient = useQueryClient();
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

async function submitForm() {
  if (!selectedFile.value){
    toast.error("No se ha adjuntado un documento.")
    emit("update:visible", false);
    return;
  } 
   
  mutate(selectedFile.value, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      emit("update:visible", false);
    },
  });
}

defineExpose({ isPending });
</script>
