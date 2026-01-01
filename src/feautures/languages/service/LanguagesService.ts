import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { PaginationDto } from "../../../shared/types/PaginationType";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type { LanguageType } from "../type/LanguageType";

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

  async patchLanguage(data: UpdateType<LanguageType>) {
    try {
      const response = await axiosInstance.patch(
        `/languages/${data.id}`,
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

  async removeLanguage(id: number) {
    try {
      const response = await axiosInstance.delete(`/languages/${id}`);
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

  async hideLanguage(id: number) {
    try {
      const response = await axiosInstance.patch(`/languages/hide/${id}`);
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

  async restoreLanguage(id: number) {
    try {
      const response = await axiosInstance.patch(`/languages/recover/${id}`);
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

  async getOneLanguage(id: number) {
    try {
      const response = await axiosInstance.get(`/languages/${id}`);
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
