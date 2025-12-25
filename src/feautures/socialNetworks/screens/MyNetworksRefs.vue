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
          title: `Nombre: ${item.name}`,
          resumen: `URL: ${item.redirectLink}`,
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
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import Pagination from "../../../shared/components/Pagination.vue";
import Card from "../../../shared/components/Card.vue";
import type { CardActionType } from "../../../shared/types/CardType";
import CardLoader from "../../../shared/components/CardLoader.vue";
import { useRoute, useRouter } from "vue-router";
import type { ApiResponseType } from "../../../shared/types/ApiResponseType";
import { SocialNetworksService } from "../service/SocialNetworkRefService";
import type { SocialNetworkRefType } from "../type/SocialNetworkRefType";

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
  data: networkRefs,
  isLoading,
  isError,
  error,
} = useQuery<ApiResponseType<SocialNetworkRefType[]>>({
  queryKey: ["my-networkRefs", page, limit, hiddenValue],
  queryFn: () =>
    SocialNetworksService.getMySocialNetworksRef({
      page: page.value,
      limit: limit.value,
      hidden: hiddenValue.value,
    }),
  retry: false,
});

function onCardAction(payload: { type: CardActionType; id: string }) {
  console.log(payload.type, payload.id);
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
