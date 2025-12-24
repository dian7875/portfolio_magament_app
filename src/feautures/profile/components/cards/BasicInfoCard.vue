<template>
  <div
    class="flex w-full p-4 items-end justify-between max-md:items-start max-md:flex-col max-md:gap-2 max-md:shadow-2xl rounded-2xl"
  >
    <div class="flex-col gap-2">
      <h3 class="text-xl font-semibold">Informacion General</h3>
      <p><strong>ID:</strong>{{ id }}</p>
      <p><strong>Nombre:</strong>{{ userName }}</p>
      <p>
        <strong class="truncate">Bio:</strong> {{ bio || "No establecido" }}
      </p>
      <p><strong>Titulo:</strong> {{ title || "No establecido" }}</p>
      <p><strong>Subtítulo:</strong> {{ subtitle || "No establecido" }}</p>
      <p><strong>Teléfono:</strong> {{ phone }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Web:</strong> {{ hostUrl || "No establecido" }}</p>
      <p>
        <strong class="truncate">Direccion:</strong>
        {{ location || "No establecido" }}
      </p>
    </div>
    <FwbButton @click="openEditInfo" class="max-md:w-full" color="yellow">
      Editar
    </FwbButton>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";

defineProps<{
  id: string;
  userName: string;
  phone: string;
  email: string;
  bio?: string | null;
  title?: string | null;
  subtitle?: string | null;
  location?: string | null;
  hostUrl?: string | null;
}>();

const openEditInfo = () => {};
</script>
