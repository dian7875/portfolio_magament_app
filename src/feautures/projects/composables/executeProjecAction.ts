import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import type { GeneralAction } from "../../../shared/types/GeneralActions";
import { ProjectsService } from "../service/ProjectsService";

export const UseExecuteProjectAction = () => {
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
  delete: (id) => ProjectsService.removeProject(id),
  hide: (id) => ProjectsService.hideProject(id),
  restore: (id) => ProjectsService.restoreProject(id),
};
