<template>
  <div>
    <h1>Test component</h1>
    <h2 class="text-2xl text-green-600">Tailwind Test</h2>
    <fwb-alert type="success">
      Success! You can now use Flowbite Vue in your Vue application 🎉
    </fwb-alert>
    <Button label="Search" icon="pi pi-search" />

    <FwbButton color="green">BTN</FwbButton>
  </div>
</template>
<script setup lang="ts">
import { FwbAlert, FwbButton } from "flowbite-vue";
import Button from "primevue/button";
</script>
enter-class=""