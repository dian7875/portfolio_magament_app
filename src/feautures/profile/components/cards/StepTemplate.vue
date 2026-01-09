<template>
  <div class="grid grid-cols-2 gap-4">
<div
  v-for="template in options"
  :key="template.id"
  class="border rounded cursor-pointer transition"
  :class="{
    'ring-2 ring-blue-500 shadow-lg': modelValue === template.id,
    'hover:shadow-md': modelValue !== template.id
  }"
>

      <img
        :src="template.preview"
        class="w-full h-40 object-cover"
        @click="selectedPreview = template.preview"
      />

      <div class="p-2 flex justify-between items-center">
        <span class="text-sm">{{ template.name }}</span>
        <button
          type="button"
          class="text-xs text-blue-600"
          @click="selectTemplate(template.id)"
        >
          Usar
        </button>
      </div>
    </div>
  </div>

  <Dialog
    :visible="selectedPreview !== null"
    modal
    :style="{ width: '60vw' }"
    header="Preview del template"
    @update:visible="(val) => !val && (selectedPreview = null)"
    :draggable="false"
  >
    <img v-if="selectedPreview" :src="selectedPreview" class="w-full" />
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Dialog } from "primevue";
import type { CvTemplate } from "../../type/generateCvPayload";

defineProps<{
  options: CvTemplate[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const selectedPreview = ref<string | null>(null);

const selectTemplate = (id: string) => {
  emit("update:modelValue", id);
};
</script>
