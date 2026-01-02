import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import type { CreateExperienceDto } from "../type/ExperiencesType";
import { WorkExperiencesService } from "../service/WorksExperienceService";

export const UseRegisterExperience = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateExperienceDto) =>
      toast.promise(WorkExperiencesService.createExperience(data), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
