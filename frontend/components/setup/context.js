import React, { useContext } from "react";

//Auth Context
export const AuthContext = React.createContext({
  token: null,
  setToken: (data) => {},
  user: null,
  setUser: (data) => {},
});

//Use Auth Context
export function useAuthContext() {
  return useContext(AuthContext);
}
