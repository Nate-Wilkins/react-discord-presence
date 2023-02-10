export type Response<T> = {
  status: number;
  data: T | null;
};
