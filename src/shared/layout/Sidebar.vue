<template>
  <Drawer v-model:visible="visible">
    <template #container>
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between px-6 pt-4">
          <span class="text-xl font-semibold text-primary cursor-default">
            Gestor de Portafolio
          </span>
          <Button icon="pi pi-times" rounded outlined @click="close" />
        </div>

        <nav class="flex-1 overflow-y-auto px-4 mt-4">
          <ul class="space-y-1">
            <SidebarItem
              v-for="item in SIDEBAR_ITEMS"
              :key="item.path"
              v-bind="item"
              @navigate="close"
            />
          </ul>
        </nav>

        <div class="border-t p-4">
          <div
            class="flex items-center gap-3 p-3 rounded hover:bg-surface-100 cursor-pointer"
          >
            <FwbAvatar
              :img="photoUrl"
              alt="Perfil"
              rounded
              class="cursor-pointer"
            />
            <span class="font-semibold">{{ userName }}</span>
          </div>

          <FwbButton class="w-full cursor-pointer" color="red" pill outline
            >Cerrar sesión</FwbButton
          >
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import SidebarItem from "./SidebarItem.vue";
import { SIDEBAR_ITEMS } from "./sidebarItemsList";
import { Drawer } from "primevue";
import { FwbAvatar, FwbButton } from "flowbite-vue";
import { userStore } from "../store/user";

const photoUrl = computed(
  () => userStore.user?.photoUrl || "/default-avatar.png"
);

const userName = computed(() => userStore.user?.name || "Desconocido");

const visible = ref(false);

function open() {
  visible.value = true;
}

function close() {
  visible.value = false;
}

defineExpose({
  open,
});
</script>
