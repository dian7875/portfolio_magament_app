import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { SkillsFilters } from "../type/SkillsFilters";
import type { UpdateType } from "../../../shared/types/UpdateType";
import type { SkillsType } from "../type/SkillsType";

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

  async removeSkill(id: number) {
    try {
      const response = await axiosInstance.delete(`/Skills/${id}`);
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

  async hideSkill(id: number) {
    try {
      const response = await axiosInstance.patch(`/Skills/hide/${id}`);
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

  async restoreSkill(id: number) {
    try {
      const response = await axiosInstance.patch(`/Skills/recover/${id}`);
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

  async getOneSkill(id: number) {
    try {
      const response = await axiosInstance.get(`/Skills/${id}`);
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

  async patchSkill(data: UpdateType<SkillsType>) {
    try {
      const response = await axiosInstance.patch(
        `/skills/${data.id}`,
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
