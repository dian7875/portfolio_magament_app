<template>
  <div class="flex flex-col gap-3 max-h-[75dvh] overflow-auto scrollbar-gutter-stable p-3">
    <div
      v-for="n in count ?? 1"
      :key="n"
      class="p-4 bg-white flex justify-between rounded-2xl animate-pulse"
    >
      <div class="flex flex-col gap-2 w-full">
        <div class="h-5 w-40 bg-gray-200 rounded"></div>
        <div class="h-4 w-28 bg-gray-200 rounded"></div>
      </div>

      <div class="flex flex-col gap-2 items-end">
        <div class="h-6 w-28 bg-gray-200 rounded-full"></div>
        <div class="flex gap-2">
          <div class="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div class="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div class="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count?: number;
}>();
</script>
