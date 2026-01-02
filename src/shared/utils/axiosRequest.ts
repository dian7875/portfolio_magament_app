import { handleAxiosError } from "../utils/handleAxiosError";

export async function axiosRequest<T>(
  fn: () => Promise<{ data: T }>
): Promise<T> {
  try {
    const res = await fn();
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
