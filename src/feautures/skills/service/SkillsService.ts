import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { SkillsFilters } from "../type/SkillsFilters";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type { CreateSkillsDto, SkillsType } from "../type/SkillsType";
import { axiosRequest } from "../../../shared/utils/axiosRequest";

export const SkillsService = {
  async getMySkills(filters: SkillsFilters) {
    const cleanParams = Object.fromEntries(
      Object.entries(filters).filter(
        ([, v]) => v !== undefined && v !== null && v !== ""
      )
    );
    try {
      const { data } = await axiosInstance.get("skills/my", {
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
  removeSkill(id: number) {
    return axiosRequest(() => axiosInstance.delete(`/skills/${id}`));
  },

  hideSkill(id: number) {
    return axiosRequest(() => axiosInstance.patch(`/skills/hide/${id}`));
  },

  restoreSkill(id: number) {
    return axiosRequest(() => axiosInstance.patch(`/skills/recover/${id}`));
  },

  getOneSkill(id: number) {
    return axiosRequest<SkillsType>(() => axiosInstance.get(`/skills/${id}`));
  },

  patchSkill(data: UpdateType<SkillsType>) {
    return axiosRequest(() =>
      axiosInstance.patch(`/skills/${data.id}`, data.data)
    );
  },

  postSkill(data: CreateSkillsDto) {
    return axiosRequest(() => axiosInstance.post(`/skills`, data));
  },
};
