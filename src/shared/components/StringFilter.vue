<template>
  <FwbInput
    :id="queryKey"
    :name="queryKey"
    v-model="uiValue"
    :label="`Filtro por ${label}`"
    :placeholder="placeholder"
    autocomplete="off"
    class="min-w-[10dvw] custom-label!"
  />
</template>

<script setup lang="ts">
import { FwbInput } from "flowbite-vue";
import { useStringFilter } from "../composables/useStringFilter";

const props = defineProps<{
  queryKey: string;
  label: string;
  placeholder?: string;
}>();

const { uiValue } = useStringFilter(props.queryKey);
</script>

<style scoped>
.custom-label label {
  color: black!;
}
</style>
