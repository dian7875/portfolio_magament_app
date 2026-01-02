<template>
  <Breadcrumb title="Redes Sociales" />
  <main class="bg-white rounded-2xl p-4 shadow">
    <section class="flex w-full justify-between items-end">
      <SelectStatus />
      <FwbButton @click="openModal">Crear nuevo</FwbButton>
    </section>
    <MyNetworksRefs />
  </main>
  <BasicModal
    form-id="create-sn-form"
    :visible="activeModal"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Crear registro."
  >
    <CreateSNRefForm @success="closeModal" ref="formRef" />
  </BasicModal>
</template>
<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Breadcrumb from "../../../shared/layout/Breadcrumb.vue";
import MyNetworksRefs from "../screens/MyNetworksRefs.vue";
import SelectStatus from "../../../shared/components/SelectStatus.vue";
import BasicModal from "../../../shared/components/BasicModal.vue";
import CreateSNRefForm from "../components/forms/CreateSNRefForm.vue";
import { computed, ref } from "vue";

const activeModal = ref<boolean>(false);
const formRef = ref<typeof CreateSNRefForm | null>(null);
const loading = computed(() => formRef.value?.isPending ?? false);

function closeModal() {
  activeModal.value = false;
}
function openModal() {
  activeModal.value = true;
}
</script>
