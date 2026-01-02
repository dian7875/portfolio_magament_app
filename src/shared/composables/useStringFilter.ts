import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useStringFilter(queryKey: string) {

  const route = useRoute();
  const router = useRouter();

  const uiValue = computed<string>({
    get() {
      const q = route.query[queryKey];
      return typeof q === "string" ? q : "";
    },
    set(val) {
      const query = { ...route.query };

      if (!val || !val.trim()) {
        delete query[queryKey];
      } else {
        query[queryKey] = val;
      }

      query.page = "1";

      router.replace({ query });
    },
  });

  return {
    uiValue,
  };
}
