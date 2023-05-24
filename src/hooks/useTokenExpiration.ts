import jwt_decode from 'jwt-decode';
import { IDecodeToken } from '../utils/types';
import { useAppSelector } from './hooks';

const useTokenExpiration = () => {
  const { token } = useAppSelector((state) => state.userData);
  let isTokenExpired = true;

  if (!token) {
    return isTokenExpired;
  }

  const currentDate = new Date();
  const decodedToken: IDecodeToken = jwt_decode(token);
  const tokenExpTimInSec = decodedToken.exp * 1000;

  if (tokenExpTimInSec < currentDate.getTime()) {
    return isTokenExpired;
  }
  isTokenExpired = false;

  return isTokenExpired;
};

export default useTokenExpiration;
