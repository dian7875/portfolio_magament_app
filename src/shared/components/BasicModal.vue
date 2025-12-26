<template>
  <Dialog
    v-model:visible="visibleModel"
    modal
    :header="title"
    :style="{ width: '32rem' }"
    :draggable="false"
  >
    <slot />

    <template #footer>
      <Button
        label="Cancelar"
        severity="secondary"
        :disabled="loading"
        @click="close"
      />

      <Button
        label="Guardar"
        :form="formId"
        type="submit"
        :loading="loading"
        :disabled="loading"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { computed } from "vue";

const props = defineProps<{
  visible: boolean;
  title?: string;
  loading?: boolean;
  formId:string
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const visibleModel = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

function close() {
  visibleModel.value = false;
}
</script>
