import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { UpdateType } from "../../../shared/types/UpdateType";
import { axiosRequest } from "../../../shared/utils/axiosRequest";
import type { CreateProjectDto, Project } from "../type/ProjectType";
import { handleAxiosError } from "../../../shared/utils/handleAxiosError";

export const ProjectsService = {
  async getMyProjects(filters: any) {
    const cleanParams = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== undefined)
    );
    try {
      const { data } = await axiosInstance.get("projects/my", {
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

  async postProject(data: CreateProjectDto) {
    try {
      const response = await axiosInstance.post(`/projects`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  },
  async patchProject(data: UpdateType<FormData>) {
    try {
      const response = await axiosInstance.patch(
        `/projects/${data.id}`,
        data.data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  },

  removeProject(id: number) {
    return axiosRequest(() => axiosInstance.delete(`/projects/${id}`));
  },

  hideProject(id: number) {
    return axiosRequest(() => axiosInstance.patch(`/projects/hide/${id}`));
  },

  restoreProject(id: number) {
    return axiosRequest(() => axiosInstance.patch(`/projects/recover/${id}`));
  },

  getOneProject(id: number) {
    return axiosRequest<Project>(() => axiosInstance.get(`/projects/${id}`));
  },
};
