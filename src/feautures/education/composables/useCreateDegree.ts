import { EducationService } from "./../service/EducationService";
import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import type { CreateEducationDto } from "../type/EducationType";

export const UseCreateDegree = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateEducationDto) =>
      toast.promise(EducationService.postEducation(data), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
