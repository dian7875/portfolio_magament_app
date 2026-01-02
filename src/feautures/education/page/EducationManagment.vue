<template>
  <Breadcrumb title="Educacion" />
  <main class="bg-white rounded-2xl p-4 shadow">
    <section class="flex w-full justify-between items-end">
      <SelectStatus />
      <FwbButton @click="openModal">Crear nuevo</FwbButton>
    </section>

    <EducationList />
  </main>

  <BasicModal
    form-id="create-education-form"
    :visible="activeModal"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Crear registro."
  >
    <CreateDegreeForm @success="closeModal" ref="formRef" />
  </BasicModal>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import Breadcrumb from "../../../shared/layout/Breadcrumb.vue";
import CreateDegreeForm from "../components/forms/CreateDegreeForm.vue";
import EducationList from "../screens/EducationList.vue";
import BasicModal from "../../../shared/components/BasicModal.vue";
import SelectStatus from "../../../shared/components/SelectStatus.vue";
import { FwbButton } from "flowbite-vue";

const activeModal = ref<boolean>(false);
const formRef = ref<typeof CreateDegreeForm | null>(null);
const loading = computed(() => formRef.value?.isPending ?? false);

function closeModal() {
  activeModal.value = false;
}
function openModal() {
  activeModal.value = true;
}
</script>
