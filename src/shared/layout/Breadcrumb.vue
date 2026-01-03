<template>
  <section class="flex flex-col gap-2 mb-4">
    <nav aria-label="Breadcrumb" class="text-sm text-gray-500">
      <ol class="flex items-center gap-2">
        <li>
          <RouterLink to="/home" class="hover:underline"> Inicio </RouterLink>
        </li>
        <li>/</li>
        <li class="text-gray-700 font-medium curd">
          {{ title }}
        </li>
      </ol>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  title: string;
}>();
</script>
