<template>
  <CardLoader v-if="isLoading" :count="limit" />
  <div v-else-if="isError" class="text-red-600">
    {{ error?.message }}
  </div>
  <template v-else-if="networkRefs">
    <div
      class="flex flex-col gap-3 max-h-[75dvh] overflow-auto scrollbar-gutter-stable p-3"
    >
      <Card
        class="shadow"
        v-for="item in networkRefs.data"
        :key="item.id"
        :data="{
          id: String(item.id),
          title: `Nombre: ${item.title}  (${formatYear(item.finishDate)})`,
          resumen: [
            `Demo: ${item.demoUrl}`,
            `Repositorio: ${item.repoUrl}`,
            `Imagenes del proyecto: ${item.imagesPath?.length}`,
          ],
          hidden: item.hidden,
          actions: ['edit', 'delete', 'hide', 'restore'],
        }"
        @action="onCardAction"
      />
    </div>
  </template>
  <Pagination
    :page="page"
    :limit="limit"
    :total="networkRefs?.meta.total ?? 0"
    :loading="isLoading"
    @update:page="page = $event"
    @update:limit="limit = $event"
  />

  <BasicModal
    form-id="edit-project-info-form"
    :visible="activeModal === 'edit'"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Editar proyecto"
  >
    <EditProjectForm
      v-if="selectedId"
      :id="selectedId"
      @success="closeModal"
      ref="formRef"
    />
  </BasicModal>

  <BasicModal
    :form-id="`${activeModal}-project-form`"
    :visible="activeModal !== null && activeModal !== 'edit'"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Confirmar acción"
  >
    <ConfirmAcctionForm
      v-if="selectedId && activeModal !== null && activeModal !== 'edit'"
      :id="selectedId"
      :action="activeModal"
      @success="closeModal"
      ref="formRef"
    />
  </BasicModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import Pagination from "../../../shared/components/Pagination.vue";
import Card from "../../../shared/components/Card.vue";
import type { CardActionType } from "../../../shared/types/CardType";
import CardLoader from "../../../shared/components/CardLoader.vue";
import type { ApiResponseType } from "../../../shared/types/ApiResponseType";
import type { Project } from "../type/ProjectType";
import { ProjectsService } from "../service/ProjectsService";
import { formatYear } from "../../../shared/utils/FormatDate";
import ConfirmAcctionForm from "../components/ConfirmAcctionForm.vue";
import BasicModal from "../../../shared/components/BasicModal.vue";
import EditProjectForm from "../components/EditProjectForm.vue";
import { useHiddenFilter } from "../../../shared/composables/useHiddenFilter";
import { usePaginationFilter } from "../../../shared/composables/usePaginationFilter";

const activeModal = ref<CardActionType | null>(null);
const selectedId = ref<number | null>(null);

type FormInstance =
  | InstanceType<typeof EditProjectForm>
  | InstanceType<typeof ConfirmAcctionForm>;

const formRef = ref<FormInstance | null>(null);
const loading = computed(() => formRef.value?.isPending ?? false);

function onCardAction(payload: { type: CardActionType; id: string }) {
  selectedId.value = Number(payload.id);
  activeModal.value = payload.type;
}

function closeModal() {
  activeModal.value = null;
  selectedId.value = null;
}

const { apiValue: hiddenValue } = useHiddenFilter();
const { page, limit } = usePaginationFilter({ page: 1, limit: 5 });

const {
  data: networkRefs,
  isLoading,
  isError,
  error,
} = useQuery<ApiResponseType<Project[]>>({
  queryKey: ["my-projects", page, limit, hiddenValue],
  queryFn: () =>
    ProjectsService.getMyProjects({
      page: page.value,
      limit: limit.value,
      hidden: hiddenValue.value,
    }),
  retry: false,
});
</script>
