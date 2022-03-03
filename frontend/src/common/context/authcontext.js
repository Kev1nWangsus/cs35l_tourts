import { createContext } from 'react';

export const AuthContext = createContext({
  uid: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
