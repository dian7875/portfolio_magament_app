<script setup lang="ts">
  import { Toaster } from "vue3-hot-toast";
import Header from "./shared/layout/Header.vue";
</script>

<template>
  <Toaster/>
  <router-view>
    <Header/>
  </router-view>
</template>

<style>

</style>
