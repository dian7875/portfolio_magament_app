import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { PaginationDto } from "../../../shared/types/PaginationType";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type {
  CreateExperienceDto,
  ExperiencesType,
} from "../type/ExperiencesType";
import { axiosRequest } from "../../../shared/utils/axiosRequest";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";

export const WorkExperiencesService = {
  async getMyWorkExperiencesRef(filters: PaginationDto) {
    const cleanParams = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== undefined)
    );
    try {
      const { data } = await axiosInstance.get("experiences/my", {
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

  createExperience(data: CreateExperienceDto) {
    return axiosRequest(() => axiosInstance.post<ApiMutationResponse>(`/experiences`, data));
  },

  removeExperience(id: number) {
    return axiosRequest(() => axiosInstance.delete<ApiMutationResponse>(`/experiences/${id}`));
  },

  hideExperience(id: number) {
    return axiosRequest(() => axiosInstance.patch<ApiMutationResponse>(`/experiences/hide/${id}`));
  },

  restoreExperience(id: number) {
    return axiosRequest(() =>
      axiosInstance.patch<ApiMutationResponse>(`/experiences/recover/${id}`)
    );
  },

  getOneExperience(id: number) {
    return axiosRequest<ExperiencesType>(() =>
      axiosInstance.get(`/experiences/${id}`)
    );
  },

  patchExperience(data: UpdateType<ExperiencesType>) {
    return axiosRequest(() =>
      axiosInstance.patch<ApiMutationResponse>(`/experiences/${data.id}`, data.data)
    );
  },
};
