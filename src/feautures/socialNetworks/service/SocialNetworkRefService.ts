import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { PaginationDto } from "../../../shared/types/PaginationType";
import type {
  CreateSocialNetworkDto,
  SocialNetworkRefType,
} from "../type/SocialNetworkRefType";
import type { UpdateType } from "../../../shared/types/UpdateType";
import { axiosRequest } from "../../../shared/utils/axiosRequest";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";

export const SocialNetworksService = {
  async getMySocialNetworksRef(filters: PaginationDto) {
    const cleanParams = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== undefined)
    );
    try {
      const { data } = await axiosInstance.get("social-medias/my", {
        params: cleanParams,
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ?? "Error obteniendo los datos"
        );
      }
      throw new Error("Error desconocido");
    }
  },
  patchSN(data: UpdateType<SocialNetworkRefType>) {
    return axiosRequest<ApiMutationResponse>(() =>
      axiosInstance.patch(`/social-medias/${data.id}`, data.data)
    );
  },

  removeSN(id: number) {
    return axiosRequest(() => axiosInstance.delete<ApiMutationResponse>(`/social-medias/${id}`));
  },

  hideSN(id: number) {
    return axiosRequest(() => axiosInstance.patch<ApiMutationResponse>(`/social-medias/hide/${id}`));
  },

  restoreSN(id: number) {
    return axiosRequest(() =>
      axiosInstance.patch<ApiMutationResponse>(`/social-medias/recover/${id}`)
    );
  },

  createSN(data: CreateSocialNetworkDto) {
    return axiosRequest(() => axiosInstance.post<ApiMutationResponse>(`/social-medias`, data));
  },

  getOneSN(id: number) {
    return axiosRequest<SocialNetworkRefType>(() =>
      axiosInstance.get(`/social-medias/${id}`)
    );
  },
};
