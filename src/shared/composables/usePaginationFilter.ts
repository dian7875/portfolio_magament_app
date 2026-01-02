import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export function usePaginationFilter(defaults = { page: 1, limit: 5 }) {
  const route = useRoute();
  const router = useRouter();

  const page = computed<number>({
    get() {
      return Number(route.query.page) || defaults.page;
    },
    set(val) {
      if (val === Number(route.query.page)) return;

      router.replace({
        query: {
          ...route.query,
          page: val.toString(),
        },
      });
    },
  });

  const limit = computed<number>({
    get() {
      return Number(route.query.limit) || defaults.limit;
    },
    set(val) {
      if (val === Number(route.query.limit)) return;

      router.replace({
        query: {
          ...route.query,
          limit: val.toString(),
        },
      });
    },
  });

  return {
    page,
    limit,
  };
}
