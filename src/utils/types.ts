export interface IResponseError {
  data?: {
    errors?: [
      {
        message?: string;
      }
    ];
  };
  status?: number;
}
