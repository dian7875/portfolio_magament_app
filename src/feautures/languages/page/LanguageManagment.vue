<template>
  <Breadcrumb title="Idiomas" />
  <main class="bg-white rounded-2xl p-4 shadow">
    <MyLanguagesList />
  </main>
</template>
<script setup lang="ts">
import Breadcrumb from "../../../shared/layout/Breadcrumb.vue";
import MyLanguagesList from "../screens/MyLanguagesList.vue";
</script>
