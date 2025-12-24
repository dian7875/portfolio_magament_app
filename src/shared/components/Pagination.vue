<template>
  <Paginator
    v-model:first="first"
    :rows="limit"
    :totalRecords="total"
    :rowsPerPageOptions="isMobile ? [] : [5, 10, 15, 20]"
    :template="
      isMobile
        ? 'PrevPageLink CurrentPageReport NextPageLink'
        : 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
    "
    currentPageReportTemplate="Página {currentPage} de {totalPages}"
    :disabled="loading"
    class="custom-paginator"
    @page="onPageChange"
  />
</template>

<script setup lang="ts">
import Paginator from "primevue/paginator";
import { computed } from "vue";
import { useMediaQuery } from "@vueuse/core";

const props = defineProps<{
  page: number;
  limit: number;
  total: number;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:page", value: number): void;
  (e: "update:limit", value: number): void;
}>();

const isMobile = useMediaQuery("(max-width: 768px)");

const first = computed({
  get: () => (props.page - 1) * props.limit,
  set: (value: number) => {
    const newPage = Math.floor(value / props.limit) + 1;
    emit("update:page", newPage);
  },
});

const onPageChange = (event: any) => {
  emit("update:page", event.page + 1);
  emit("update:limit", event.rows);
};
</script>

<style>
.custom-paginator .p-paginator {
  background: transparent;
  border: none;
}

.custom-paginator .p-paginator .p-paginator-page {
  color: black;
}

.custom-paginator .p-paginator .p-paginator-page-selected {
  color: white;
  background: black;
}
</style>
