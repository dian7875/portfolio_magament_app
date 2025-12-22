<template>
  <li>
    <button
      v-ripple
      @click="go"
      :class="[
        'w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors hover:bg-zinc-700 cursor-pointer',
        isActive
          ? 'bg-primary text-primary-contrast'
          : 'text-surface-700 hover:bg-surface-100',
      ]"
    >
      <i :class="icon" />
      <span class="font-medium">{{ label }}</span>
    </button>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{
  label: string;
  icon: string;
  path: string;
}>();

const emit = defineEmits<{
  (e: "navigate"): void;
}>();

const route = useRoute();
const router = useRouter();

const isActive = computed(() => route.path.startsWith(props.path));

function go() {
  emit("navigate");
  router.push(props.path);
}
</script>
