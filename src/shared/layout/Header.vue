<template>
  <header class="w-full bg-white shadow flex justify-between px-2 py-3 sticky top-0 z-50">
    <div class="flex items-center gap-3">
      <FwbButton aria-label="Abrir menú" color="alternative" square @click="sidebarRef?.open()">
        ☰
      </FwbButton>

      <div>
        <span class="self-center text-lg font-semibold whitespace-nowrap cursor-default">
          Gestor de Portafolio
        </span>
      </div>
    </div>

    <div class="flex items-center">
      <FwbDropdown placement="left">
        <template #trigger>
          <FwbAvatar
            :img="photoUrl"
            alt="Perfil"
            rounded
          />
        </template>
        <nav aria-label="Menú de usuario" class="flex flex-col gap-2 p-2">
          <RouterLink class="hover:border-b hover:text-blue-500" to="/"
            >Inicio</RouterLink
          >
          <RouterLink class="hover:border-b hover:text-blue-500" to="/usuario"
            >Mi Perfil</RouterLink
          >
          <RouterLink class="hover:border-b hover:text-red-500" to="/"
            >Cerrar Sesion</RouterLink
          >
        </nav>
      </FwbDropdown>
    </div>
  </header>
  <Sidebar ref="sidebarRef" />
</template>

<script setup lang="ts">
import { FwbAvatar, FwbDropdown, FwbButton } from "flowbite-vue";
import { computed, ref } from "vue";
import Sidebar from "./Sidebar.vue";
import { userStore } from "../store/user";

const photoUrl = computed(() => 
  userStore.user?.photoUrl || "/default-avatar.png"
);

const sidebarRef = ref<InstanceType<typeof Sidebar> | null>(null);


</script>
