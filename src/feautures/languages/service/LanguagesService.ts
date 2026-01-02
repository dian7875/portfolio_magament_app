import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { PaginationDto } from "../../../shared/types/PaginationType";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type { CreateLanguageDto, LanguageType } from "../type/LanguageType";
import { axiosRequest } from "../../../shared/utils/axiosRequest";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";

export const LanguageService = {
  async getMyLanguages(filters: PaginationDto) {
    const cleanParams = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== undefined)
    );
    try {
      const { data } = await axiosInstance.get("languages/my", {
        params: cleanParams,
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ??
            "Error obteniendo los datos del usuario"
        );
      }
      throw new Error("Error desconocido");
    }
  },

  patchLanguage(data: UpdateType<LanguageType>) {
    return axiosRequest<ApiMutationResponse>(() =>
      axiosInstance.patch(`/languages/${data.id}`, data.data)
    );
  },

  postLanguage(data: CreateLanguageDto) {
    return axiosRequest(() => axiosInstance.post<ApiMutationResponse>(`/languages`, data));
  },

  removeLanguage(id: number) {
    return axiosRequest(() => axiosInstance.delete<ApiMutationResponse>(`/languages/${id}`));
  },

  hideLanguage(id: number) {
    return axiosRequest(() => axiosInstance.patch<ApiMutationResponse>(`/languages/hide/${id}`));
  },

  restoreLanguage(id: number) {
    return axiosRequest(() => axiosInstance.patch<ApiMutationResponse>(`/languages/recover/${id}`));
  },

  getOneLanguage(id: number) {
    return axiosRequest<LanguageType>(() =>
      axiosInstance.get(`/languages/${id}`)
    );
  },
};
