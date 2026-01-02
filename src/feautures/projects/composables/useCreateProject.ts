
import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import { ProjectsService } from "../service/ProjectsService";
import type { CreateProjectDto } from "../type/ProjectType";

export const UseCreateProject = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateProjectDto) =>
      toast.promise(ProjectsService.postProject(data), {
        loading: "Por favor espera...",
        success: (response: ApiMutationResponse) => h("span", response.message),
        error: (error: ApiError) => h("span", error.message),
      }),
  });

  return mutation;
};
