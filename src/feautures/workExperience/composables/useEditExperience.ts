import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type { ExperiencesType } from "../type/ExperiencesType";
import { WorkExperiencesService } from "../service/WorksExperienceService";

export const UseEditExperience = () => {
  const mutation = useMutation({
    mutationFn: (data: UpdateType<ExperiencesType>) =>
      toast.promise(WorkExperiencesService.patchExperience(data), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
