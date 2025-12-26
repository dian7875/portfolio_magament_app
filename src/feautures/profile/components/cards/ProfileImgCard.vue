<template>
  <div class="relative inline-block mt-4">
    <img
      @click="isEditPhotoOpen = true"
      title="Cambiar imagen"
      :src="photoUrl || '/default-avatar.png'"
      class="w-72 h-72 rounded-full object-cover border cursor-pointer max-md:h-44 max-md:w-44"
    />
    <FwbButton
      @click="isEditPhotoOpen = true"
      color="yellow"
      pill
      class="max-md:block hidden absolute bottom-0 right-0 transition-transform duration-300 ease-out hover:rotate-12"
    >
      <i class="pi pi-pencil" />
    </FwbButton>
  </div>

  <BasicModal
    v-model:visible="isEditPhotoOpen"
    title="Editar foto"
    :loading="loading"
    form-id="edit-photo-form"
  >
    <ChangeProfileImg
    :current-photo-url="photoUrl"
      @update:visible="isEditPhotoOpen = $event"
      ref="formRef"
    />
  </BasicModal>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { computed, ref } from "vue";
import BasicModal from "../../../../shared/components/BasicModal.vue";
import ChangeProfileImg from "../forms/ChangeProfileImg.vue";

defineProps<{
  photoUrl?: string | null;
  photoPath?: string | null;
}>();

const isEditPhotoOpen = ref(false);
const formRef = ref<InstanceType<typeof ChangeProfileImg>>();

const loading = computed(() => formRef.value?.isPending ?? false);
</script>
