<template>
  <CardLoader v-if="isLoading" :count="limit" />
  <div v-else-if="isError" class="text-red-600">
    {{ error?.message }}
  </div>
  <template v-else-if="education">
    <div
      class="flex flex-col gap-3 max-h-[75dvh] overflow-auto scrollbar-gutter-stable p-3"
    >
      <Card
        class="shadow"
        v-for="item in education.data"
        :key="item.id"
        :data="{
          id: String(item.id),
          title: `${item.title} (${formatPeriod(
            item.startDate,
            item.endDate || null,
            item.finished
          )})`,
          resumen: `${item.institution}, ${item.description}. ${
            item.finished ? 'Finalizado' : 'En curso'
          }`,
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
    :total="education?.meta.total ?? 0"
    :loading="isLoading"
    @update:page="page = $event"
    @update:limit="limit = $event"
  />

  <BasicModal
    form-id="edit-education-info-form"
    :visible="activeModal === 'edit'"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Editar idioma"
  >
    <EditEducationForm
      v-if="selectedId"
      :id="selectedId"
      @success="closeModal"
      ref="formRef"
    />
  </BasicModal>

  <BasicModal
    :form-id="`${activeModal}-education-form`"
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
import { EducationService } from "../service/EducationService";
import type { ApiResponseType } from "../../../shared/types/ApiResponseType";
import type { EducationType } from "../type/EducationType";
import { formatPeriod } from "../../../shared/utils/FormatDate";
import ConfirmAcctionForm from "../components/forms/ConfirmAcctionForm.vue";
import BasicModal from "../../../shared/components/BasicModal.vue";
import EditEducationForm from "../components/forms/EditEducationForm.vue";

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
  data: education,
  isLoading,
  isError,
  error,
} = useQuery<ApiResponseType<EducationType[]>>({
  queryKey: ["my-education", page, limit, hiddenValue],
  queryFn: () =>
    EducationService.getMyEducations({
      page: page.value,
      limit: limit.value,
      hidden: hiddenValue.value,
    }),
  retry: false,
});

const activeModal = ref<CardActionType | null>(null);
const selectedId = ref<number | null>(null);

type FormInstance =
  | InstanceType<typeof EditEducationForm>
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
