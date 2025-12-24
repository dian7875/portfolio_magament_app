export type ApiResponseType<T> = {
  data: T;
  meta: {
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
    total:number
  };
};
