<template>
  <Breadcrumb title="Habilidades" />
  <main class="bg-white rounded-2xl p-4 shadow">
    <section class="flex w-full justify-between items-end">
      <div class="flex gap-3">
        <SelectStatus />
        <StringFilter
          query-key="category"
          label="Categoria"
          placeholder="Ej: Backend"
        />
      </div>
      <FwbButton @click="openModal">Crear nuevo</FwbButton>
    </section>
    <MySkills />
  </main>

  <BasicModal
    form-id="create-skill-form"
    :visible="activeModal"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Crear registro."
  >
    <CreateSkillForm @success="closeModal" ref="formRef" />
  </BasicModal>
</template>
<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import SelectStatus from "../../../shared/components/SelectStatus.vue";
import StringFilter from "../../../shared/components/StringFilter.vue";
import Breadcrumb from "../../../shared/layout/Breadcrumb.vue";
import MySkills from "../screens/MySkills.vue";
import BasicModal from "../../../shared/components/BasicModal.vue";
import { computed, ref } from "vue";
import CreateSkillForm from "../components/forms/CreateSkillForm.vue";

const activeModal = ref<boolean>(false);
const formRef = ref<typeof CreateSkillForm | null>(null);
const loading = computed(() => formRef.value?.isPending ?? false);

function closeModal() {
  activeModal.value = false;
}
function openModal() {
  activeModal.value = true;
}
</script>
