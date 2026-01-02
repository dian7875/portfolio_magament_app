<template>
  <Breadcrumb title="Experiencia laboral" />
  <main class="bg-white rounded-2xl p-4 shadow">
    <section class="flex w-full justify-between items-end">
      <SelectStatus />
      <FwbButton @click="openModal">Crear nuevo</FwbButton>
    </section>
    <MyWorkExperiences />
  </main>
  <BasicModal
    form-id="create-experience-form"
    :visible="activeModal"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Crear registro."
  >
    <CreateWorkExperienceForm @success="closeModal" ref="formRef" />
  </BasicModal>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import Breadcrumb from "../../../shared/layout/Breadcrumb.vue";
import MyWorkExperiences from "../screens/MyWorkExperiences.vue";
import BasicModal from "../../../shared/components/BasicModal.vue";
import CreateWorkExperienceForm from "../components/forms/CreateWorkExperienceForm.vue";
import SelectStatus from "../../../shared/components/SelectStatus.vue";
import { FwbButton } from "flowbite-vue";

const activeModal = ref<boolean>(false);
const formRef = ref<typeof CreateWorkExperienceForm | null>(null);
const loading = computed(() => formRef.value?.isPending ?? false);

function closeModal() {
  activeModal.value = false;
}
function openModal() {
  activeModal.value = true;
}
</script>
