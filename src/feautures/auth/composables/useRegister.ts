import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import type { RegisterDto } from "../type/AuthDto";
import { AuthService } from "../service/AuthService";

export const UseRegister = () => {
  const mutation = useMutation({
    mutationFn: (data: RegisterDto) =>
      toast.promise(AuthService.register(data), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
