import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import { SkillsService } from "../service/SkillsService";
import type { CreateSkillsDto } from "../type/SkillsType";

export const UseCreateSkill = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateSkillsDto) =>
      toast.promise(SkillsService.postSkill(data), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
