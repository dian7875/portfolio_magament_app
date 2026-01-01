<template>
  <CardLoader v-if="isLoading" :count="limit" />
  <div v-else-if="isError" class="text-red-600">
    {{ error?.message }}
  </div>
  <template v-else-if="experiences">
    <div
      class="flex flex-col gap-3 max-h-[75dvh] overflow-auto scrollbar-gutter-stable p-3"
    >
      <Card
        class="shadow"
        v-for="item in experiences.data"
        :key="item.id"
        :data="{
          id: String(item.id),
          title: `Nombre: ${item.company} (${formatPeriod(
            item.startDate,
            item.endDate || null,
            item.endDate ? true : false
          )})`,
          resumen: [
            `Rol: ${item.role}`,
            `${item.description ? item.description : ''}`,
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
    :total="experiences?.meta.total ?? 0"
    :loading="isLoading"
    @update:page="page = $event"
    @update:limit="limit = $event"
  />
  <BasicModal
    form-id="edit-experience-info-form"
    :visible="activeModal === 'edit'"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Editar experiencia"
  >
    <EditExperienceForm
      v-if="selectedId"
      :id="selectedId"
      @success="closeModal"
      ref="formRef"
    />
  </BasicModal>

  <BasicModal
    :form-id="`${activeModal}-experience-form`"
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
import { computed, onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import Pagination from "../../../shared/components/Pagination.vue";
import Card from "../../../shared/components/Card.vue";
import type { CardActionType } from "../../../shared/types/CardType";
import CardLoader from "../../../shared/components/CardLoader.vue";
import { useRoute, useRouter } from "vue-router";
import type { ApiResponseType } from "../../../shared/types/ApiResponseType";
import type { ExperiencesType } from "../type/ExperiencesType";
import { WorkExperiencesService } from "../service/WorksExperienceService";
import { formatPeriod } from "../../../shared/utils/FormatDate";
import BasicModal from "../../../shared/components/BasicModal.vue";
import ConfirmAcctionForm from "../components/forms/ConfirmAcctionForm.vue";
import EditExperienceForm from "../components/forms/EditExperienceForm.vue";

const route = useRoute();
const router = useRouter();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 5);
const hiddenValue = ref<boolean | null>(
  route.query.hidden === "true"
    ? true
    : route.query.hidden === "false"
    ? false
    : null
);

const {
  data: experiences,
  isLoading,
  isError,
  error,
} = useQuery<ApiResponseType<ExperiencesType[]>>({
  queryKey: ["my-experiences", page, limit, hiddenValue],
  queryFn: () =>
    WorkExperiencesService.getMyWorkExperiencesRef({
      page: page.value,
      limit: limit.value,
      hidden: hiddenValue.value,
    }),
  retry: false,
});

const activeModal = ref<CardActionType | null>(null);
const selectedId = ref<number | null>(null);

type FormInstance =
  | InstanceType<typeof ConfirmAcctionForm>
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

onMounted(() => {
  if (!route.query.page || !route.query.limit) {
    router.replace({
      query: {
        page: page.value,
        limit: limit.value,
      },
    });
  }
});

watch([page, limit, hiddenValue], () => {
  router.replace({
    query: {
      ...route.query,
      page: page.value.toString(),
      limit: limit.value.toString(),
      ...(hiddenValue.value !== null && {
        hidden: hiddenValue.value.toString(),
      }),
    },
  });
});
</script>
