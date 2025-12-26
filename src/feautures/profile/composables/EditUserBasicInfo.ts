import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { UserBasicInfoType } from "../type/userBasicInfoType";
import { UserService } from "../service/userService";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";

export const UseEditUser = () => {
  const mutation = useMutation({
    mutationFn: (data: UserBasicInfoType) =>
      toast.promise(UserService.patchMe(data), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
