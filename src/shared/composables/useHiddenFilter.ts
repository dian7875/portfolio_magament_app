import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

type HiddenUIValue = "true" | "false" | "all";

export function useHiddenFilter() {
  const route = useRoute();
  const router = useRouter();

  const uiValue = computed<HiddenUIValue>({
    get() {
      const q = route.query.hidden;
      if (q === "true" || q === "false") return q;
      return "all";
    },
    set(val) {
      const query = { ...route.query };

      if (val === "all") {
        delete query.hidden;
      } else {
        query.hidden = val;
      }

      query.page = "1"; 

      router.replace({ query });
    },
  });

  const apiValue = computed<boolean | null>(() => {
    if (uiValue.value === "all") return null;
    return uiValue.value === "true";
  });

  return {
    uiValue,
    apiValue,
  };
}
