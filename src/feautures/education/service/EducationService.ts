import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { EducationFilters } from "../type/EducationFilter";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type { EducationType } from "../type/EducationType";

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

  
  async patchEducation(data: UpdateType<EducationType>) {
    try {
      const response = await axiosInstance.patch(
        `/education/${data.id}`,
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

  async removeEducation(id: number) {
    try {
      const response = await axiosInstance.delete(`/education/${id}`);
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

  async hideEducation(id: number) {
    try {
      const response = await axiosInstance.patch(`/education/hide/${id}`);
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

  async restoreEducation(id: number) {
    try {
      const response = await axiosInstance.patch(`/education/restore/${id}`);
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

  async getOneEducation(id: number) {
    try {
      const response = await axiosInstance.get(`/education/${id}`);
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
