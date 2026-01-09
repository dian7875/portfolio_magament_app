<template>
  <ul class="flex flex-col gap-2">
    <li v-for="item in options" :key="item.id" class="flex items-center gap-2">
      <FwbCheckbox
        :checked="modelValue.includes(item.id)"
        @change="toggle(item.id)"
      />

      <span>
        {{ item[labelKey] }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { FwbCheckbox } from "flowbite-vue";

type SelectableItem = {
  id: number;
  [key: string]: unknown;
};

const props = defineProps<{
  options: SelectableItem[];
  modelValue: number[];
  labelKey: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
}>();

const toggle = (id: number) => {
  const exists = props.modelValue.includes(id);

  emit(
    "update:modelValue",
    exists
      ? props.modelValue.filter((i) => i !== id)
      : [...props.modelValue, id]
  );
};
</script>
