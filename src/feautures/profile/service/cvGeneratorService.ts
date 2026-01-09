import axios from "axios";
import axiosInstance from "../../../shared/services/AxiosIstance";
import type { CvGeneratePayload } from "../type/generateCvPayload";

export const CvGenService = {
  async getProjects() {
    return await getCatalog("/projects/names");
  },

  async getSkills() {
    return await getCatalog("/skills/names");
  },

  async getExperiences() {
    return await getCatalog("/experiences/companies");
  },

  async getLanguages() {
    return await getCatalog("/languages/names");
  },

  async getEducation() {
    return await getCatalog("/education/titles");
  },

  async genCv(data: CvGeneratePayload) {
    try {
      const response = await axiosInstance.post("cvgenerator", data, {
        responseType: "blob",
      });

      const disposition = response.headers["content-disposition"];
      const filename = extractFilename(disposition);

      downloadFile(response.data, filename);
      return { message: "CV generado con exito." };
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
};

const extractFilename = (disposition?: string): string => {
  if (!disposition) return "cv.pdf";

  const match = disposition.match(/filename="(.+)"/);
  return match?.[1] ?? "cv.pdf";
};

const downloadFile = (data: Blob, filename: string) => {
  const blob = new Blob([data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const getCatalog = async (url: string) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ?? "Error obteniendo catálogo"
      );
    }
    throw new Error("Error desconocido");
  }
};
