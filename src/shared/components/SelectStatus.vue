<template>
  <FwbSelect
    id="status"
    name="status"
    v-model="uiValue"
    :options="status"
    label="Filtro por estado"
    class="min-w-[10dvw]"
  />
</template>
<script setup lang="ts">
import { FwbSelect } from "flowbite-vue";
import { useHiddenFilter } from "../composables/useHiddenFilter";

const { uiValue } = useHiddenFilter();

const status = [
  { value: "all", name: "Todos" },
  { value: "false", name: "Visibles" },
  { value: "true", name: "Ocultos" },
];
</script>
