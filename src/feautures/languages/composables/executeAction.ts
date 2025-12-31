import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import { LanguageService } from "../service/LanguagesService";
import type { GeneralAction } from "../../../shared/types/GeneralActions";

export const UseExecuteAction = () => {
  const mutation = useMutation({
    mutationFn: (payload: { action: GeneralAction; id: number }) =>
      toast.promise(actionServiceMap[payload.action](payload.id), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });
  return mutation;
};

const actionServiceMap: Record<
  GeneralAction,
  (id: number) => Promise<ApiMutationResponse>
> = {
  delete: (id) => LanguageService.removeLanguage(id),
  hide: (id) => LanguageService.hideLanguage(id),
  restore: (id) => LanguageService.restoreLanguage(id),
};
