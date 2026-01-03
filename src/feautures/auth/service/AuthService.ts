import axiosInstance from "../../../shared/services/AxiosIstance";
import { userStore } from "../../../shared/store/user";
import { axiosRequest } from "../../../shared/utils/axiosRequest";
import type { LoginDto, loginResponse, RegisterDto } from "../type/AuthDto";
import type { ApiMutationResponse } from "../../../shared/types/ApiMutationResponse";

export const AuthService = {
  async login(data: LoginDto) {
    const response = await axiosRequest(() =>
      axiosInstance.post<loginResponse>(`/auth/login`, data)
    );

    const token = response.acces_token;

    const user = response.user;

    if (!token) {
      throw new Error("Fallo al iniciar session: Porfavor intente denuevo");
    }
    localStorage.setItem("accessToken", token);
    userStore.setUser(user);

    return { message: `Bienvenido ${user.name}.` };
  },

  async register(data: RegisterDto) {
    return axiosRequest(() =>
      axiosInstance.post<ApiMutationResponse>(`/auth/register`, data)
    );
  },
};
