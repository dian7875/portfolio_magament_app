<template>
  <form
    :id="formId"
    @submit.prevent="executeAction"
    class="flex flex-col gap-3 pb-1"
  >
    <p class="text-base text-white">
      {{ actionMessage }}
    </p>

    <p v-if="props.action === 'delete'" class="text-sm text-red-600">
      Esta acción no se puede deshacer.
    </p>
  </form>
</template>

<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import {
  actionLabelMap,
  type GeneralAction,
} from "../../../../shared/types/GeneralActions";
import { computed } from "vue";
import { UseExecuteExperienceAction } from "../../composables/executeExperienceAction";

const props = defineProps<{
  id: number;
  action: GeneralAction;
}>();

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { mutate, isPending } = UseExecuteExperienceAction();
const queryClient = useQueryClient();

const executeAction = async () => {
  const payload = {
    id: props.id,
    action: props.action,
  };

  mutate(payload, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-experiences"],
      });
      emit("success");
    },
  });
};

const actionMessage = computed(() => {
  const actionLabel = actionLabelMap[props.action];

  return `¿Está seguro de ${actionLabel} este idioma?`;
});


const formId = computed(() => `${props.action}-experience-form`);

defineExpose({
  isPending,
});
</script>
