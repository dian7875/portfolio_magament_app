import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import { LanguageService } from "../service/LanguagesService";
import type { CreateLanguageDto } from "../type/LanguageType";

export const UseCreateLanguage = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateLanguageDto) =>
      toast.promise(LanguageService.postLanguage(data), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
