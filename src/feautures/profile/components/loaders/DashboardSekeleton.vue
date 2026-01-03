<template>
  <div class="flex flex-col gap-6 animate-pulse">
    <div class="h-4 w-1/4 bg-gray-300 rounded"></div>
    
  <div class="flex items-center gap-4 p-4 bg-gray-200 rounded-lg">
    <div class="h-16 w-16 rounded-full bg-gray-300"></div>
    <div class="flex-1 flex flex-col gap-2">
      <div class="h-4 w-1/2 bg-gray-300 rounded"></div>
      <div class="h-3 w-1/3 bg-gray-300 rounded"></div>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
    v-for="i in 6"
    :key="i"
    class="h-24 bg-gray-200 rounded-lg flex items-center justify-center"
    >
    <div class="h-6 w-1/3 bg-gray-300 rounded"></div>
  </div>
</div>
<div class="h-8 w-1/3 bg-gray-300 rounded"></div>
</div>
</template>
<script setup lang="ts"></script>
