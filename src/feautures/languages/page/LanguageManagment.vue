<template>
  <Breadcrumb title="Idiomas" />
  <main class="bg-white rounded-2xl p-4 shadow">
    <section class="flex w-full justify-between items-end">
      <SelectStatus />
      <FwbButton @click="openModal">Crear nuevo</FwbButton>
    </section>
    <MyLanguagesList />
  </main>
  <BasicModal
    form-id="create-language-form"
    :visible="activeModal"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Crear registro."
  >
    <CreateLanguageForm @success="closeModal" ref="formRef" />
  </BasicModal>
</template>
<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import SelectStatus from "../../../shared/components/SelectStatus.vue";
import Breadcrumb from "../../../shared/layout/Breadcrumb.vue";
import MyLanguagesList from "../screens/MyLanguagesList.vue";
import BasicModal from "../../../shared/components/BasicModal.vue";
import CreateLanguageForm from "../components/forms/CreateLanguageForm.vue";
import { computed, ref } from "vue";

const activeModal = ref<boolean>(false);
const formRef = ref<typeof CreateLanguageForm | null>(null);
const loading = computed(() => formRef.value?.isPending ?? false);

function closeModal() {
  activeModal.value = false;
}
function openModal() {
  activeModal.value = true;
}
</script>
