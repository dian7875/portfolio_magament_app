import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";

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
};
