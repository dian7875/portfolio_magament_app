import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { UserBasicInfoType } from "../type/userBasicInfoType";

export const UserService = {
  async getMe() {
    try {
      const { data } = await axiosInstance.get("/users/me/info");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ?? "Error obteniendo usuario"
        );
      }
      throw new Error("Error desconocido");
    }
  },

  async patchMe(data: UserBasicInfoType) {
    try {
      const response = await axiosInstance.patch("/users/me/basic-info", data);
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

  async updatePhoto(file: File) {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await axiosInstance.patch("users/me/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
        throw new Error(
          error.response?.data?.message || "Error al subir la foto"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Error desconocido");
      }
    }
  },

  async updateCV(file: File) {
    try {
      const formData = new FormData();
      formData.append("cv", file);

      const response = await axiosInstance.patch("users/me/cv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
        throw new Error(
          error.response?.data?.message || "Error al subir el cv"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Error desconocido");
      }
    }
  }
};
