import axios from "axios";

type ApiErrorResponse = {
  message?: string;
};

export function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Error desconocido";

    console.error("Axios error:", error.response?.data || error.message);
    throw new Error(message);
  }

  console.error("Unknown error:", error);
  throw new Error("Error desconocido");
}
