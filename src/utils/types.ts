import { User } from '@firebase/auth-types';

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

export interface IUserWithAccessToken extends User {
  accessToken: string;
}
