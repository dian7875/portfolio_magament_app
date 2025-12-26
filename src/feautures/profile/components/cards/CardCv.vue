<template>
  <div class="rounded-2xl p-4 flex flex-col gap-3 max-md:shadow-2xl">
    <h3 class="text-xl font-semibold">Curriculum Vitae</h3>
    <p>
      <strong>Estado:</strong>{{ cvUrl ? "CV cargado" : "No hay CV cargado" }}
    </p>

    <p v-if="cvUrl" class="text-sm">
      <strong>Archivo:</strong>

      <a :href="cvUrl" target="_blank" class="text-blue-600 hover:underline">
        Ver CV
      </a>
    </p>

    <div class="flex gap-2 mt-2">
      <FwbButton color="yellow" @click="isEditCvOpen = true">
        {{ cvUrl ? "Cambiar CV" : "Subir CV" }}
      </FwbButton>
    </div>
  </div>
  <BasicModal
    v-model:visible="isEditCvOpen"
    title="Editar curriculum"
    :loading="loading"
    form-id="edit-cv-form"
  >
    <ChangeCV
      :current-c-v-url="cvUrl"
      @update:visible="isEditCvOpen = $event"
      ref="formRef"
    />
  </BasicModal>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import ChangeCV from "../forms/ChangeCV.vue";
import { computed, ref } from "vue";
import BasicModal from "../../../../shared/components/BasicModal.vue";

defineProps<{
  cvUrl?: string | null;
  cvPath?: string | null;
}>();

const isEditCvOpen = ref(false);
const formRef = ref<InstanceType<typeof ChangeCV>>();

const loading = computed(() => formRef.value?.isPending ?? false);
</script>
