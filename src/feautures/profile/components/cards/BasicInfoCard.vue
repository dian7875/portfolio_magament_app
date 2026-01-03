<template>
  <div
    class="flex w-full p-4 items-end justify-between max-md:items-start max-md:flex-col max-md:gap-2 max-md:shadow-2xl rounded-2xl"
  >
    <div class="flex-col gap-2">
      <h3 class="text-xl font-semibold">Informacion General</h3>
      <p><strong>ID:</strong>{{ id }}</p>
      <p><strong>Nombre:</strong>{{ userName }}</p>
      <p>
        <strong class="truncate">Bio:</strong> {{ bio || "No establecido" }}
      </p>
      <p><strong>Titulo:</strong> {{ title || "No establecido" }}</p>
      <p><strong>Subtítulo:</strong> {{ subtitle || "No establecido" }}</p>
      <p class="tracking-wide"><strong>Teléfono:</strong> {{ phone }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p>
        <strong>Web: </strong>
        <span v-if="hostUrl">
          <a
            :href="hostUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >
            {{ hostUrl }}
          </a>
        </span>
        <span v-else>No establecido</span>
      </p>
      <p>
        <strong class="truncate">Direccion:</strong>
        {{ location || "No establecido" }}
      </p>
    </div>
    <FwbButton @click="isEditOpen = true" class="max-md:w-full" color="yellow">
      Editar
    </FwbButton>
  </div>
  <BasicModal
    form-id="edit-basic-info-form"
    v-model:visible="isEditOpen"
    title="Editar información"
    :loading="loading"
  >
    <EditBasicInfoForm
      @update:visible="isEditOpen = $event"
      ref="formRef"
      :user-id="id"
    />
  </BasicModal>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import BasicModal from "../../../../shared/components/BasicModal.vue";
import EditBasicInfoForm from "../forms/EditBasicInfoForm.vue";
import { computed, ref } from "vue";

defineProps<{
  id: string;
  userName: string;
  phone: string;
  email: string;
  bio?: string | null;
  title?: string | null;
  subtitle?: string | null;
  location?: string | null;
  hostUrl?: string | null;
}>();

const isEditOpen = ref(false);
const formRef = ref<InstanceType<typeof EditBasicInfoForm>>();

const loading = computed(() => formRef.value?.isPending ?? false);
</script>
