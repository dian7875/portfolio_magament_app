import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { EducationFilters } from "../type/EducationFilter";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type { CreateEducationDto, EducationType } from "../type/EducationType";
import { axiosRequest } from "../../../shared/utils/axiosRequest";

export const EducationService = {
  async getMyEducations(filters: EducationFilters) {
    const cleanParams = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== undefined)
    );
    try {
      const { data } = await axiosInstance.get("education", {
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

  postEducation(data: CreateEducationDto) {
    return axiosRequest(() => axiosInstance.post(`/education`, data));
  },

  patchEducation(data: UpdateType<EducationType>) {
    return axiosRequest(() =>
      axiosInstance.patch(`/education/${data.id}`, data.data)
    );
  },

  removeEducation(id: number) {
    return axiosRequest(() => axiosInstance.delete(`/education/${id}`));
  },

  hideEducation(id: number) {
    return axiosRequest(() => axiosInstance.patch(`/education/hide/${id}`));
  },

  restoreEducation(id: number) {
    return axiosRequest(() => axiosInstance.patch(`/education/restore/${id}`));
  },
  getOneEducation(id: number) {
    return axiosRequest<EducationType>(() =>
      axiosInstance.get(`/education/${id}`)
    );
  },
};
