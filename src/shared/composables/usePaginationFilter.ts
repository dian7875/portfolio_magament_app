import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export function usePaginationFilter(defaults = { page: 1, limit: 5 }) {
  const route = useRoute();
  const router = useRouter();

  const page = ref<number>(defaults.page);
  const limit = ref<number>(defaults.limit);

  onMounted(() => {
    const queryPage = Number(route.query.page);
    const queryLimit = Number(route.query.limit);

    page.value = queryPage || defaults.page;
    limit.value = queryLimit || defaults.limit;

    /* 🔥 Si no existen en la URL → inyectarlos */
    if (!route.query.page || !route.query.limit) {
      router.replace({
        query: {
          ...route.query,
          page: page.value.toString(),
          limit: limit.value.toString(),
        },
      });
    }
  });

  watch(page, (val) => {
    if (Number(route.query.page) === val) return;

    router.replace({
      query: {
        ...route.query,
        page: val.toString(),
      },
    });
  });

  watch(limit, (val) => {
    if (Number(route.query.limit) === val) return;

    router.replace({
      query: {
        ...route.query,
        limit: val.toString(),
        page: "1", 
      },
    });
  });

  watch(
    () => route.query,
    (query) => {
      const qPage = Number(query.page);
      const qLimit = Number(query.limit);

      if (qPage && qPage !== page.value) {
        page.value = qPage;
      }

      if (qLimit && qLimit !== limit.value) {
        limit.value = qLimit;
      }
    }
  );

  return {
    page,
    limit,
  };
}
