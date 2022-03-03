import { createContext } from 'react';

export const AuthContext = createContext({
  uid: null,
  isLogIn: false,
  login: () => {},
  logout: () => {},
});
