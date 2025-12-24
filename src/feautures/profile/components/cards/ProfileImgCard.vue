<template>
  <div class="relative inline-block mt-4">
    <img
      @click="openEditPhoto"
      title="Cambiar imagen"
      :src="photoUrl || '/default-avatar.png'"
      class=" w-72 h-72 rounded-full object-cover border cursor-pointer max-md:h-44 max-md:w-44"
    />
    <FwbButton
      @click="openEditPhoto"
      color="yellow"
      pill
      class="max-md:block hidden absolute bottom-0 right-0 transition-transform duration-300 ease-out hover:rotate-12"
    >
      <i class="pi pi-pencil" />
    </FwbButton>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";

defineProps<{
  photoUrl?: string | null;
  photoPath?: string | null;
}>();

const openEditPhoto = () => {};
</script>
