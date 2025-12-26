import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import { UserService } from "../service/userService";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";

export const UseEditUserCV = () => {
  const mutation = useMutation({
    mutationFn: (file: File) =>
      toast.promise(UserService.updateCV(file), {
        loading: "Porfavor espere...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
