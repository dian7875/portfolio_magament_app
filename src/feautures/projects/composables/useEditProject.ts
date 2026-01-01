import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import { ProjectsService } from "../service/ProjectsService";
import type { UpdateType } from "../../../shared/types/UpdateType";

export const UseEditProject = () => {
  const mutation = useMutation({
    mutationFn: (data: UpdateType<FormData>) =>
      toast.promise(ProjectsService.patchProject(data), {
        loading: "Por favor espera...",
        success: (response: ApiMutationResponse) => h("span", response.message),
        error: (error: ApiError) => h("span", error.message),
      }),
  });

  return mutation;
};
