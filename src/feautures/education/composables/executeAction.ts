import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import type { GeneralAction } from "../../../shared/types/GeneralActions";
import { EducationService } from "../service/EducationService";

export const UseExecuteEducationAction = () => {
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
  delete: (id) => EducationService.removeEducation(id),
  hide: (id) => EducationService.hideEducation(id),
  restore: (id) => EducationService.restoreEducation(id),
};