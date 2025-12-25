import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { SkillsFilters } from "../type/SkillsFilters";

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
};
