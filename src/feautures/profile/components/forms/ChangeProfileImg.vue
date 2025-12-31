<template>
  <form
    id="edit-photo-form"
    @submit.prevent="submitForm"
    class="flex flex-col gap-4 items-center"
  >
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center">
        <span class="text-sm mb-1">Actual</span>
        <div
          class="w-32 h-32 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center"
        >
          <img
            v-if="props.currentPhotoUrl"
            :src="props.currentPhotoUrl"
            alt="Foto actual"
            class="w-full h-full object-cover"
          />
          <div v-else class="text-gray-400 text-center text-sm">Sin foto</div>
        </div>
      </div>

      <span class="text-xl font-bold">→</span>

      <div class="flex flex-col items-center">
        <span class="text-sm mb-1">Nueva</span>
        <div
          class="w-32 h-32 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center"
        >
          <img
            v-if="previewUrl"
            :src="previewUrl"
            alt="Foto seleccionada"
            class="w-full h-full object-cover"
          />
          <div v-else class="text-gray-400 text-center text-sm">Sin foto</div>
        </div>
      </div>
    </div>

    <input
      type="file"
      accept="image/*"
      @change="onFileChange"
      class="hidden"
      ref="fileInput"
    />
    <button
      type="button"
      @click="triggerFileSelect"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Seleccionar foto
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UseEditUserPhoto } from "../../composables/EditUserPhoto";
import { useQueryClient } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";

const props = defineProps<{
  currentPhotoUrl?: string | null;
}>();

const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(props.currentPhotoUrl || null);

const { mutate, isPending } = UseEditUserPhoto();

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
    toast.error("No se ha adjuntado una foto de perfil.")
    emit("update:visible", false);
    return;
  } 
    

  mutate(selectedFile.value, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      emit("update:visible", false);
    },
  });
}

defineExpose({
  isPending,
});
</script>
