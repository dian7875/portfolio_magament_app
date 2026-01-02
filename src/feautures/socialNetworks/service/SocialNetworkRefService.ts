import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { PaginationDto } from "../../../shared/types/PaginationType";
import type {
  CreateSocialNetworkDto,
  SocialNetworkRefType,
} from "../type/SocialNetworkRefType";
import type { UpdateType } from "../../../shared/types/UpdateType";
import { axiosRequest } from "../../../shared/utils/axiosRequest";

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
    return axiosRequest(() =>
      axiosInstance.patch(`/social-medias/${data.id}`, data.data)
    );
  },

  // ✅ DELETE
  removeSN(id: number) {
    return axiosRequest(() => axiosInstance.delete(`/social-medias/${id}`));
  },

  // ✅ HIDE
  hideSN(id: number) {
    return axiosRequest(() => axiosInstance.patch(`/social-medias/hide/${id}`));
  },

  // ✅ RESTORE
  restoreSN(id: number) {
    return axiosRequest(() =>
      axiosInstance.patch(`/social-medias/recover/${id}`)
    );
  },

  // ✅ CREATE
  createSN(data: CreateSocialNetworkDto) {
    return axiosRequest(() => axiosInstance.post(`/social-medias`, data));
  },

  // ✅ GET ONE
  getOneSN(id: number) {
    return axiosRequest<SocialNetworkRefType>(() =>
      axiosInstance.get(`/social-medias/${id}`)
    );
  },
};
