import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../shared/types/ApiError";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";
import type { CreateSocialNetworkDto } from "../type/SocialNetworkRefType";
import { SocialNetworksService } from "../service/SocialNetworkRefService";

export const UseCreateSN = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateSocialNetworkDto) =>
      toast.promise(SocialNetworksService.createSN(data), {
        loading: "Please wait...",
        success: (response: ApiMutationResponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
