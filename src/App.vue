<script setup lang="ts">
import { Toaster } from "vue3-hot-toast";
import Header from "./shared/layout/Header.vue";
</script>

<template>
  <Toaster />
  <Header />
  <main class=" pt-3 p-6">
    <router-view />
  </main>
</template>

<style></style>
