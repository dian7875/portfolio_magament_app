import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import { CvGenService } from "../service/cvGeneratorService";
import type { CvGeneratePayload } from "../type/generateCvPayload";

export const UseGenerateCv = () => {
  const mutation = useMutation({
    mutationFn: (data: CvGeneratePayload) =>
      toast.promise(CvGenService.genCv(data), {
        loading: "Porfavor espere...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
