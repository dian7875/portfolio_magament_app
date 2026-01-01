import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { PaginationDto } from "../../../shared/types/PaginationType";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type { ExperiencesType } from "../type/ExperiencesType";

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

  async removeExperience(id: number) {
    try {
      const response = await axiosInstance.delete(`/experiences/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Error desconocido");
      }
    }
  },

  async hideExperience(id: number) {
    try {
      const response = await axiosInstance.patch(`/experiences/hide/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Error desconocido");
      }
    }
  },

  async restoreExperience(id: number) {
    try {
      const response = await axiosInstance.patch(`/experiences/recover/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Error desconocido");
      }
    }
  },

  async getOneExperience(id: number) {
    try {
      const response = await axiosInstance.get(`/experiences/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Error desconocido");
      }
    }
  },

  async patchExperience(data: UpdateType<ExperiencesType>) {
    try {
      const response = await axiosInstance.patch(
        `/experiences/${data.id}`,
        data.data
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Error desconocido");
      }
    }
  },
};
