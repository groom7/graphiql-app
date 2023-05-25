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
export interface ISetLinkActiveStyleArg {
  isActive: boolean;
}
export type TSetLinkActiveStyle = (object: ISetLinkActiveStyleArg) => { [key: string]: string };
export interface IDecodeToken {
  exp: number;
}
