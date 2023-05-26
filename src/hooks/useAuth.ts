import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppSelector, useAppDispatch } from './hooks';
import { removeUser, setUser } from '../services/slices/userDataSlice';
import { IUserWithAccessToken } from '../utils/types/types';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { email, token, id } = useAppSelector((state) => state.userData);
  const [isAuth, setIsAuth] = useState(false);
  const [authWasListened, setAuthWasListened] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken } = user as IUserWithAccessToken;

        setIsAuth(true);
        setAuthWasListened(false);
        dispatch(setUser({ email: user.email, id: user.uid, token: accessToken }));
      } else {
        setIsAuth(false);
        setAuthWasListened(false);
        dispatch(removeUser());
      }
    });
  }, [dispatch]);

  return {
    authWasListened,
    isAuth,
    email,
    token,
    id,
  };
};

export default useAuth;
