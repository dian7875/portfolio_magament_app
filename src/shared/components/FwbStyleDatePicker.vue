<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="block text-sm font-medium text-gray-900">
      {{ label }}
    </label>

    <DatePicker
      :id="id"
      :name="props.name"
      :disabled="disabled"
      v-model="internalValue"
      class="w-full"
      placeholder="dd/mm/yyyy"
      inputClass="
        w-full
        !bg-white
        border
        border-gray-300
        !text-gray-900
        text-sm
        rounded-lg
        focus:ring-blue-500
        focus:border-blue-500
        block
        px-3
        py-2
        disabled:bg-gray-100
        disabled:cursor-not-allowed
      "
      panelClass="
        bg-white
        border
        border-gray-200
        rounded-lg
        shadow-lg
        p-2
      "
      dateFormat="dd/mm/yy"
      showIcon
    />
  </div>
</template>

<script setup lang="ts">

import { DatePicker } from "primevue";
import { computed } from "vue";

const props = defineProps<{
  id: string;
  name: string;
  modelValue: string | null | undefined;
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();

const internalValue = computed<Date | null>({
  get() {
    return props.modelValue ? new Date(props.modelValue) : null;
  },
  set(val: Date | null) {
    let valueToEmit: string | null = null;
    if (val instanceof Date && !isNaN(val.getTime())) {
      valueToEmit = val.toISOString(); 
    }
    emit("update:modelValue", valueToEmit);
  },
});
</script>
