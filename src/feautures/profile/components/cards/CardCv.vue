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
      <FwbButton color="yellow" @click="openEditCv">
        {{ cvUrl ? "Cambiar CV" : "Subir CV" }}
      </FwbButton>

      <FwbButton v-if="cvUrl" color="red" outline> Eliminar </FwbButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";

defineProps<{
  cvUrl?: string | null;
  cvPath?: string | null;
}>();

const openEditCv = () => {};
</script>
