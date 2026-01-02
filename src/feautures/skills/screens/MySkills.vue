<template>
  <CardLoader v-if="isLoading" :count="limit" />
  <div v-else-if="isError" class="text-red-600">
    {{ error?.message }}
  </div>
  <template v-else-if="skills">
    <div
      class="flex flex-col gap-3 max-h-[75dvh] overflow-auto scrollbar-gutter-stable p-3"
    >
      <Card
        class="shadow"
        v-for="item in skills.data"
        :key="item.id"
        :data="{
          id: String(item.id),
          title: `Habilidad: ${item.name}`,
          resumen: [
            `Categoria: ${item.category}`,
            `Conocimiento: ${item.level}`,
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
    :total="skills?.meta.total ?? 0"
    :loading="isLoading"
    @update:page="page = $event"
    @update:limit="limit = $event"
  />

  <BasicModal
    form-id="edit-skill-info-form"
    :visible="activeModal === 'edit'"
    @update:visible="(val) => !val && closeModal()"
    :loading="loading"
    title="Editar habilidad"
  >
    <UpdateSkillForm
      v-if="selectedId"
      :id="selectedId"
      @success="closeModal"
      ref="formRef"
    />
  </BasicModal>

  <BasicModal
    :form-id="`${activeModal}-skill-form`"
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
import type { SkillsType } from "../type/SkillsType";
import { SkillsService } from "../service/SkillsService";
import BasicModal from "../../../shared/components/BasicModal.vue";
import ConfirmAcctionForm from "../components/forms/ConfirmAcctionForm.vue";
import UpdateSkillForm from "../components/forms/UpdateSkillForm.vue";
import { useHiddenFilter } from "../../../shared/composables/useHiddenFilter";
import { usePaginationFilter } from "../../../shared/composables/usePaginationFilter";
import { useStringFilter } from "../../../shared/composables/useStringFilter";

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

const { apiValue: hiddenValue } = useHiddenFilter();
const { uiValue: category } = useStringFilter("category");
const { page, limit } = usePaginationFilter({ page: 1, limit: 5 });

const {
  data: skills,
  isLoading,
  isError,
  error,
} = useQuery<ApiResponseType<SkillsType[]>>({
  queryKey: ["my-skills", page, limit, hiddenValue, category],
  queryFn: () =>
    SkillsService.getMySkills({
      page: page.value,
      limit: limit.value,
      hidden: hiddenValue.value,
      category: category.value,
    }),
  retry: false,
});
</script>
