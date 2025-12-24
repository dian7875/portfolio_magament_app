<template>
  <div class="p-4 bg-white flex justify-between rounded-2xl max-md:flex-col">
    <div>
      <h3>{{ props.data.title }}</h3>
      <p>{{ props.data.resumen }}</p>
    </div>
    <div class="flex flex-col gap-2">
      <FwbBadge
      class="w-full"
        :type="
          data.hidden
            ? VISIBILITY_META.hidden.badgeType
            : VISIBILITY_META.visible.badgeType
        "
      >
        {{
          data.hidden
            ? VISIBILITY_META.hidden.label
            : VISIBILITY_META.visible.label
        }}
      </FwbBadge>
      <div class="flex gap-2">
        <FwbButton 
        class=" max-md:w-full"
          v-for="action in visibleActions"
          :key="action"
          :color="CARD_ACTION_META[action].color"
          @click="onAction(action)"
        >
          <i :class="['pi', `pi-${CARD_ACTION_META[action].icon}`]" />
        </FwbButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbButton, FwbBadge } from "flowbite-vue";
import { computed } from "vue";
import { getVisibleCardActions } from "../utils/GetVisibleCardActions";
import {
  type CardData,
  type CardActionType,
  CARD_ACTION_META,
} from "../types/CardType";
import { VISIBILITY_META } from "../types/BadgeType";

const props = defineProps<{ data: CardData }>();

const emit = defineEmits<{
  (e: "action", payload: { type: CardActionType; id: string }): void;
}>();

const visibleActions = computed(() => getVisibleCardActions(props.data));

function onAction(type: CardActionType) {
  emit("action", { type, id: props.data.id });
}
</script>
