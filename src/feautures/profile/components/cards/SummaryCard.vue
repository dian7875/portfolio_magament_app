<template>
  <div
    class="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center"
    @click="$emit('click')"
  >
    <h3 class="text-gray-500 text-sm">{{ title }}</h3>
    <p class="text-2xl font-bold">{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string; count: number }>();
</script>
