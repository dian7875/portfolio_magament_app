import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { PaginationDto } from "../../../shared/types/PaginationType";

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
};
