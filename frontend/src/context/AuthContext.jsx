import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [accessToken, setAccessToken] = useState(null);

  const [user, setUser] = useState(null);

  

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ logout, user,setAccessToken, accessToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext
